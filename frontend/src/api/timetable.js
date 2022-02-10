import { api } from "api/api";

export const getTimeTable = async (success, fail) => {
  return await api.get("/api/timetable").then(success).catch(fail);
};
