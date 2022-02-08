import { api } from "api/api";

export const startRecord = async (params) => {
  return await api.post("/api/studyrecord", params);
};

export const endRecord = async (studyRecordId) => {
  return await api.put(`/api/studyrecord/${studyRecordId}`);
};

export const getRecordList = async (studyDate) => {
  return await api.get(`/api/studyrecord/list/${studyDate}`);
};
