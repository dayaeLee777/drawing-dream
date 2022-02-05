import { api } from "api/api";

export const registerCommunity = async (content, success, fail) => {
  return await api
    .post("/api/community/register", content)
    .then(success)
    .catch(fail);
};

export const modifyCommunity = async (content, success, fail) => {
  return await api
    .put("/api/community/update", content)
    .then(success)
    .catch(fail);
};

export const getCommunityList = async (success, fail) => {
  return await api.get("/api/community/list").then(success).catch(fail);
};

export const deleteCommunity = async (communityId, success, fail) => {
  return await api
    .delete(`/api/community/${communityId}`)
    .then(success)
    .catch(fail);
};
export const getCommunityDetail = async (communityId, success, fail) => {
  return await api
    .get(`/api/community/${communityId}`)
    .then(success)
    .catch(fail);
};

export const registerComment = async (content, success, fail) => {
  return await api
    .post("/api/comment/register", content)
    .then(success)
    .catch(fail);
};

export const getCommentList = async (communityId, success, fail) => {
  return await api
    .get(`/api/comment/list/${communityId}`)
    .then(success)
    .catch(fail);
};

export const modifyComment = async (content, success, fail) => {
  return await api
    .put("/api/comment/updata", content)
    .then(success)
    .catch(fail);
};

export const deleteComment = async (commentId, success, fail) => {
  return await api
    .delete(`/api/comment/${commentId}`)
    .then(success)
    .catch(fail);
};

export const registerSubComment = async (content, success, fail) => {
  return await api
    .post("/api/subComment/register", content)
    .then(success)
    .catch(fail)
};

export const getReCommentList = async (commentId, success, fail) => {
  return await api
    .get(`/api/subComment/list/${commentId}`)
    .then(success)
    .catch(fail)
}

export const deleteReComment = async (commentId, success, fail) => {
  return await api
    .delete(`/api/subComment/${commentId}`)
    .then(success)
    .catch(fail)
}