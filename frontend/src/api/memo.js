import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

axios.create({
  headers: { "Content-Type": `application/json` },
});
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getMemoList = async (success, fail) => {
  return await axios.get("/api/memo/list").then(success).catch(fail);
};

export const getMemo = async (memoId, success, fail) => {
  return await axios.get(`/api/memo/${memoId}`).then(success).catch(fail);
};
