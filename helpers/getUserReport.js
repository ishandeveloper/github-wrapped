import axios from "axios";

export const getUserReport = async (username, token) => {
  if (!token)
    return axios.get(`/api/stats?username=${username}`).then((res) => res.data);

  return axios
    .get(`/api/stats?username=${username}&token=${token}`)
    .then((res) => res.data);
};
