const CLIENT_ID = process.env.GH_CLIENT_ID;
const REDIRECT_URL = process.env.GH_REDIRECT_URL;

module.exports = async (req, res) => {
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=user,repo,read:org`
  );
};
