const axios = require("axios");
const JSSoup = require("jssoup").default;

require("dotenv").config();

const { multiTokenizer } = require("./multitokenizer");

// Github Search REST API currently does not support sorting repositories by number of stars
const fetchTotalStarsAndPRs = (parameters, token) => {
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: {
      query: `
        query userInfo($login: String!) {
          user(login: $login) {
            pullRequests(after: "2022-01-01", before: "2022-12-31") {
              totalCount
            }
            avatarUrl
            name
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
              totalCount
              nodes {
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
        `,
      variables: parameters,
    },
  }).then((e) => {
    return {
      pr: e.data.data.user.pullRequests.totalCount,
      name: e.data.data.user.name,
      avatar: e.data.data.user.avatarUrl,
      stars: e.data.data.user.repositories.nodes.reduce((prev, curr) => {
        return prev + curr.stargazers.totalCount;
      }, 0),
    };
  });
};

// https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-commits
const fetchTotalCommits = (params, token) => {
  return axios({
    method: "get",
    url: `https://github.com/users/${params.login}/contributions?from=2022-01-01`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `bearer ${token}`,
    },
  }).then((e) => {
    const soup = new JSSoup(e.data);
    const selector = soup.findAll("rect");
    let commitsCount = 0;

    const commits = selector.map((commit) => {
      const count = commit.attrs["data-count"];
      const day = commit.attrs["data-date"];
      const level = commit.attrs["data-level"];

      if (parseInt(count)) commitsCount += parseInt(count);

      return {
        count,
        day,
        level,
      };
    });

    return { total_count: commitsCount, data: commits };
  });
};

//https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-issues-and-pull-requests
const fetchTotalIssues = (params, token) => {
  return axios({
    method: "get",
    url: `https://api.github.com/search/issues?q=author:${params.login}+is:issue+created:2022-01-01..2022-12-31`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `bearer ${token}`,
    },
  }).then((e) => e.data["total_count"]);
};

export const statsFetch = async (parameters) => {
  const _stats = {
    name: "",
    avatar: "",
    pr: 0,
    stars: 0,
    issues: 0,
    commits: 0,
  };

  // If user hasn't authenticated with github, use the public API
  if (!parameters.token) {
    const { pr, stars, name, avatar } = await fetcher(
      fetchTotalStarsAndPRs,
      parameters
    );

    _stats.commits = await fetcher(fetchTotalCommits, parameters);
    _stats.issues = await fetcher(fetchTotalIssues, parameters);
    _stats.pr = pr;
    _stats.stars = stars;
    _stats.avatar = avatar;
    _stats.name = name;
  }
  // If user has authenticated with github, use their access toen
  else {
    const { pr, stars, name, avatar } = await fetchTotalStarsAndPRs(
      { login: parameters["login"] },
      parameters["token"]
    );
    _stats.commits = await fetchTotalCommits(parameters, parameters["token"]);
    _stats.issues = await fetchTotalIssues(parameters, parameters["token"]);
    _stats.pr = pr;
    _stats.stars = stars;
    _stats.avatar = avatar;
    _stats.name = name;
  }

  return _stats;
};

const fetcher = async (func, params) => {
  try {
    let res = await multiTokenizer(func, params, 0);
    return res;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports = async (req, res) => {
  try {
    const { username, token } = req.query;
    const stats = await statsFetch({ login: username, token: token });

    // Headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `public, max-age=1800`);

    return res.send({
      data: { ...stats },
      generated_at: new Date().getTime(),
      error_code: 0,
    });
  } catch (err) {
    return res.send({
      error_code: "001",
      message: err.message,
      secondary: err.secondaryMessage,
    });
  }
};
