const { fetchStats } = require("./fetch");

module.exports = async (req, res) => {
  const { username } = req.query;

  res.setHeader("Content-Type", "application/json");

  try {
    const _call = await fetchStats(username);
    res.setHeader("Cache-Control", `public, max-age=1800`);

    return res.send({
      data: { ..._call },
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
