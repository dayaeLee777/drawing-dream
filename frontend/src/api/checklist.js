import { api } from "api/api";

export const registerCheckList = async (content, success, fail) => {
  return await api.post("/api/checklist", content).then(success).catch(fail);
};

export const modifyCheckList = async (content, success, fail) => {
  return await api.put("/api/checklist/", content).then(success).catch(fail);
};

export const getCheckList = async (success, fail) => {
  return await api.get("/api/checklist/list").then(success).catch(fail);
};

export const deleteCheckList = async (checklistId, success, fail) => {
  return await api
    .put(`/api/checklist/delete/${checklistId}`)
    .then(success)
    .catch(fail);
};
