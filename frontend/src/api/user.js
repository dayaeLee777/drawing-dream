import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

export const loginUser = async (user, success, fail) => {
  return await api.post("/api/auth/login", user);
};

export const signUp = async (user, success, fail) => {
  return await api.post("/api/user/signup", user);
};

export const getSchool = async (params, success, fail) => {
  console.log(params);
  return await axios
    .get("https://open.neis.go.kr/hub/schoolInfo", { params })
    .then(success)
    .catch(fail);
};

export const getDept = async (userId, success, fail) => {
  return await api.get(`/api/profile/${userId}`).then(success).catch(fail);
};

export const getUser = async (userId, success, fail) => {
  return await api.get(`/api/user/${userId}`).then(success).catch(fail);
};

export const idCheck = async (userId) => {
  return await api.get(`/api/user/idCheck/${userId}`);
};
