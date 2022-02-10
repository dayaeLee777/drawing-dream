import { api } from "api/api";

export const getRooms = async (success, fail) => {
  return await api.get("api/chat/room/all").then(success).catch(fail);
};

export const createChatRoom = async (params, success, fail) => {
  return await api.post("/api/chat/room", params).then(success).catch(fail);
};

export const getChatList = async (roomId, success, fail) => {
  return await api.get(`/api/chat/room/${roomId}`).then(success).catch(fail);
};
