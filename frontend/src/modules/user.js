import axios from "axios";

const LOGIN = "USER/LOGIN";

export const login = ({ loginId, password }) => {
  axios
    .post(
      "/api/auth/login",
      { loginId, password },
      {
        headers: { "Content-Type": `application/json` },
      }
    )
    .then((response) => {
      if (response.headers.authorization && response.data) {
        sessionStorage.setItem("access-token", response.headers.authorization);
        console.log(response.data);
        return {
          type: LOGIN,
          userId: response.data,
        };
      }
    });
};

const token = sessionStorage.getItem("access-token");
const initialState = token ? { isLoggedIn: true } : { isLoggedIn: false };

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default user;
