import axios from "axios";

const api = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": `application/json`,
      Authorization: `${sessionStorage.getItem("access-token")}`,
    },
  });
  return instance;
};

export const attend = async () => {
  console.log(sessionStorage.getItem("access-token"));
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${sessionStorage.getItem("access-token")}`;

  return await axios.post("/api/attendance/attend", {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
