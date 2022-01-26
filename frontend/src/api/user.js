import axios from "axios";

// const api = () => {
//   return axios.create({
//     headers: { "Content-Type": `application/json` },
//   });
// };

export const loginUser = async (user, success, fail) => {
  return await axios.post("/api/auth/login", user, {
    headers: { "Content-Type": `application/json` },
  });
};

export const signUp = async (user, success, fail) => {
  return await axios.post("/api/user/signup", user, {
    headers: { "Context-Type": `application/json` },
  });
};

export const getSchool = async (params, success, fail) => {
  console.log(params);
  return await axios
    .get("https://open.neis.go.kr/hub/schoolInfo", { params })
    .then(success)
    .catch(fail);
};
