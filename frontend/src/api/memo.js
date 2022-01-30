import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${
      sessionStorage.getItem("access-token") ||
      localStorage.getItem("access-token")
    }`,
  },
});
// api.defaults.headers.common.Authorization = `Bearer ${token}`;

export const getMemoList = async (success, fail) => {
  return await api.get("/api/memo/list").then(success).catch(fail);
};

export const getMemo = async (memoId, success, fail) => {
  return await api.get(`/api/memo/${memoId}`).then(success).catch(fail);
};
