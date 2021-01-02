require("dotenv").config();
const axios = require("axios").default;

export const getUserReport = async (username) => {
  let res = await axios.get(
    `${process.env.API_URL ?? ""}/api?username=${username}`
  );

  return res.data;
};
