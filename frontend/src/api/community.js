import { api } from "api/api";

export const registerCommunity = async (content, success, fail) => {
  console.log(content);
  return await api.post("/api/community/register", content).then(success).catch(fail);
};

export const modifyCommunity = async (content, success, fail) => {
  return await api.put("/api/community/update", content).then(success).catch(fail);
};

export const getCommunityList = async (success, fail) => {
  return await api.get("/api/community/list").then(success).catch(fail);
};

export const deleteCommunityList = async (communityId, success, fail) => {
  return await api
    .delete(`/api/community/${communityId}`)
    .then(success)
    .catch(fail);
};
export const getCommunityDetail = async (communityId, success, fail) => {
  return await api.get(`/api/community/${communityId}`).then(success).catch(fail);
}