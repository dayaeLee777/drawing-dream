import axios from "axios";

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

export const getRooms = async (success, fail) => {
  return await api.get("api/chat/room/all").then(success).catch(fail);
};
