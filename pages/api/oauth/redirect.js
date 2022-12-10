const axios = require("axios");

const CLIENT_ID = process.env.GH_CLIENT_ID;
const CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

const getAccessTokenFromCode = async (code) =>
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: "application/json",
    },
  });

const getUsernameFromToken = async (token) =>
  axios({
    method: "get",
    url: "https://api.github.com/user",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

module.exports = async (req, res) => {
  try {
    const accessToken = await getAccessTokenFromCode(req.query.code).then(
      (res) => res.data["access_token"]
    );

    const username = await getUsernameFromToken(accessToken).then(
      (res) => res.data["login"]
    );

    return res.redirect(`/${username}?token=${accessToken}`);
  } catch (err) {
    return res.redirect(`/?error=OAUTH_ERROR`);
  }
};
