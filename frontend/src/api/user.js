import axios from "axios";
import { BASE_URL } from "config";

// const api = () => {
//   return axios.create({
//     headers: { "Content-Type": `application/json` },
//   });
// };

export const loginUser = async (user, success, fail) => {
  return await axios.post("/api/auth/login", user, {
    headers: { "Content-Type": `application/json` },
  });
};

export const signUp = async (user, success, fail) => {
  return await axios.post("/api/user/signup", user, {
    headers: { "Context-Type": `application/json` },
  });
};

export const getSchool = async (params, success, fail) => {
  console.log(params);
  return await axios
    .get("https://open.neis.go.kr/hub/schoolInfo", { params })
    .then(success)
    .catch(fail);
};

export const getDept = async (userId, success, fail) => {
  return await axios
    .get(`/api/profile/${userId}`, {
      headers: { "Context-Type": `application/json` },
    })
    .then(success)
    .catch(fail);
};

export const getUser = async (userId, success, fail) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${userId}`;
  return await axios
    .get(`/api/user/${userId}`, {
      headers: { "Context-Type": `application/json` },
    })
    .then(success)
    .catch(fail);
};

export const idCheck = async (userId) => {
  return await axios.get(`/api/user/idCheck/${userId}`, {
    headers: { "Context-Type": "application/json" },
  });
};
