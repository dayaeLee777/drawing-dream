import {api} from 'api/api'

export const registerMemo = async (content, success, fail) => {
  return await api.post("/api/memo", content).then(success).catch(fail);
};

export const getMemo = async (memoId, success, fail) => {
  return await api.get(`/api/memo/${memoId}`).then(success).catch(fail);
};

export const getMemoList = async (success, fail) => {
  return await api.get("/api/memo/list").then(success).catch(fail);
};

export const modifyMemo = async (content, success, fail) => {
  return await api.put("api/memo", content).then(success).catch(fail);
};

export const deleteMemo = async (memoId, success, fail) => {
  return await api.put(`api/memo/delete/${memoId}`).then(success).catch(fail);
};