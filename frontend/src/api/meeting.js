import { api } from "api/api";

export const getMeeting = async (params, success, fail) => {
  return await api.post(`/api/meeting`, params).then(success).catch(fail);
};
