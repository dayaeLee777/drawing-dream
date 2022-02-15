import { api, fileApi } from "api/api";
import axios from "axios";

export const loginUser = async (user, success, fail) => {
  return await api.post("/api/auth/login", user);
};

export const signUp = async (user, success, fail) => {
  return await api.post("/api/user/signup", user);
};

export const getSchool = async (params, success, fail) => {
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

export const putUser = async (user, success, fail) => {
  return await api.put("/api/user", user);
};

export const idCheck = async (userId) => {
  return await api.get(`/api/user/idCheck/${userId}`);
};

export const profileImage = async (multipartFile, success, fail) => {
  return await fileApi
    .post("/api/profile", multipartFile)
    .then(success)
    .catch(fail);
};

export const getProfileImg = async (userId, success, fail) => {
  return await api.get(`api/profile/image/${userId}`).then(success).catch(fail);
};

export const passwordCheck = async (password) => {
  return await api.post("/api/user/password", password);
};

export const modifyPassword = async (password) => {
  return await api.put("/api/user/password", password);
};
