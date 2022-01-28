import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

axios.create({
  headers: { "Content-Type": `application/json` },
});
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const loginUser = async (user, success, fail) => {
  return await axios.post("/api/auth/login", user);
};

export const signUp = async (user, success, fail) => {
  return await axios.post("/api/user/signup", user);
};

export const getSchool = async (params, success, fail) => {
  console.log(params);
  return await axios
    .get("https://open.neis.go.kr/hub/schoolInfo", { params })
    .then(success)
    .catch(fail);
};

export const getDept = async (userId, success, fail) => {
  return await axios.get(`/api/profile/${userId}`).then(success).catch(fail);
};

export const getUser = async (userId, success, fail) => {
  return await axios.get(`/api/user/${userId}`).then(success).catch(fail);
};

export const idCheck = async (userId) => {
  return await axios.get(`/api/user/idCheck/${userId}`, {
    headers: { "Context-Type": "application/json" },
  });
};
