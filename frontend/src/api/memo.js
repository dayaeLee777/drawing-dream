import {api} from 'api/api'

export const getMemoList = async (success, fail) => {
  return await api.get("/api/memo/list").then(success).catch(fail);
};

export const getMemo = async (memoId, success, fail) => {
  return await api.get(`/api/memo/${memoId}`).then(success).catch(fail);
};
