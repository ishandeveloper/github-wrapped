const { fetchStats } = require("./fetch");

module.exports = async (req, res) => {
  const { username } = req.query;
  let stats = {
    name: "",
    commits: 0,
    stars: 0,
    pr: 0,
    issues: 0,
  };

  res.setHeader("Content-Type", "application/json");

  try {
    const _call = await fetchStats(username);
    res.setHeader("Cache-Control", `public, max-age=86400`);

    let _currentuser = _call.data.user;

    stats.name = _currentuser.name || _currentuser.login;

    stats.issues = _currentuser.issues.totalCount;

    stats.commits =
      _currentuser.contributionsCollection.totalCommitContributions;

    stats.pr = _currentuser.pullRequests.totalCount;

    // Traverse through all the nodes to get the sum
    stats.stars = _currentuser.repositories.nodes.reduce((prev, curr) => {
      return prev + curr.stargazers.totalCount;
    }, 0);

    return res.send({
      data: { ...stats },
      generated_at: new Date().getTime(),
      error_code: 0,
    });
  } catch (err) {
    return res.send({
      error_code: 001,
      message: err.message,
      secondary: err.secondaryMessage,
    });
  }
};
