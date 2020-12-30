const axios = require("axios");
require("dotenv").config();

const { multiTokenizer } = require("./multitokenizer");

// Github Search REST API currently does not support sorting repositories by number of stars
const fetchTotalStars = (parameters, token) => {
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
  }).then((e) =>
    e.data.data.user.repositories.nodes.reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0)
  );
};

// https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-commits
const fetchTotalCommits = (variables, token) => {
  return axios({
    method: "get",
    url: `https://api.github.com/search/commits?q=author:${variables.login}+committer-date:>2020-01-01`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `bearer ${token}`,
    },
  }).then((e) => e);
};

//https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-issues-and-pull-requests
const fetchTotalIssues = (params, token) => {
  return axios({
    method: "get",
    url: `https://api.github.com/search/issues?q=author:${params.login}+is:issue+created:2020-01-01..2020-12-31`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `bearer ${token}`,
    },
  }).then((e) => e);
};

//https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-issues-and-pull-requests
const fetchTotalPRs = (params, token) => {
  return axios({
    method: "get",
    url: `https://api.github.com/search/issues?q=author:${params.login}+is:pr+created:2020-01-01..2020-12-31`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `bearer ${token}`,
    },
  }).then((e) => e);
};

const statsFetch = async (parameters) => {
  const _stats = {
    pr: 0,
    stars: 0,
    issues: 0,
    commits: 0,
  };

  _stats.commits = await fetcher(fetchTotalCommits, parameters);
  _stats.issues = await fetcher(fetchTotalIssues, parameters);
  _stats.pr = await fetcher(fetchTotalPRs, parameters);
  _stats.stars = await fetchTotalStars(parameters, process.env.TOKEN_1);

  return _stats;
};

const fetcher = async (func, params) => {
  try {
    // let res = await func(params, process.env.TOKEN_1);
    // return res;
    let res = await multiTokenizer(func, params, 0);
    return res;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export async function fetchStats(username) {
  let res = await statsFetch({ login: username });
  return res;
}
