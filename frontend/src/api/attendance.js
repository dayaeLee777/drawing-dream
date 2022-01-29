import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

export const attend = async () => {
  return await api.post("/api/attendance/attend");
};
