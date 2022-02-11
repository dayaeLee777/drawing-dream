import { api } from "api/api";

export const getTimeTable = async (success, fail) => {
  return await api.get("/api/timetable").then().catch(fail);
};

export const registerTimeTable = async (
  timeTableRegisterRequestDTO,
  success,
  fail
) => {
  return await api
    .post("/api/timetable", timeTableRegisterRequestDTO)
    .then(success)
    .catch(fail);
};

export const getPeriod = async (success, fail) => {
  return await api.get("/api/period").then(success).catch(fail);
};
