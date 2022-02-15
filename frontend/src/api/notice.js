import { api, fileApi } from "api/api";

export const registerNotice = async (content, success, fail) => {
  return await fileApi.post("/api/notice", content).then(success).catch(fail);
};

export const modifyNotice = async (content, success, fail) => {
  return await fileApi.put("/api/notice", content).then(success).catch(fail);
};

export const getNoticeTotalCount = async (success, fail) => {
  return await api.get("/api/notice/total").then(success).catch(fail);
};

export const getNoticeList = async (pageNumber, success, fail) => {
  return await api
    .get(`/api/notice/list/${pageNumber}`)
    .then(success)
    .catch(fail);
};

export const deleteNotice = async (noticeId, success, fail) => {
  return await api
    .put(`/api/notice/delete/${noticeId}`)
    .then(success)
    .catch(fail);
};
export const getNoticeDetail = async (noticeId, success, fail) => {
  return await api.get(`/api/notice/${noticeId}`).then(success).catch(fail);
};
