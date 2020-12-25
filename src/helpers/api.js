// import axios from "axios";
const axios = require("axios").default;

export const getUserReport = async (username) => {
  let res = await axios.get(`/api?username=${username}`);

  return res.data;
};
