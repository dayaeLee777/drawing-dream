import axios from "axios";

const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
const LOGIN_FAIL = "USER/LOGIN_FAIL";
const LOGOUT_SUCCESS = "USER/LOGOUT_SUCCESS";

export const login =
  ({ loginId, password }) =>
  async (dispatch) => {
    const data = await axios
      .post(
        "/api/auth/login",
        { loginId, password },
        {
          headers: { "Content-Type": `application/json` },
        }
      )
      .then((response) => {
        if (response.headers.authorization && response.data) {
          sessionStorage.setItem(
            "access-token",
            response.headers.authorization
          );
          return response;
        }
      })
      .catch(() => {});

    console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      userId: data.data,
    });
  };

export const logout = () => {
  sessionStorage.removeItem("access-token");
  return {
    type: LOGOUT_SUCCESS,
  };
};

const token = sessionStorage.getItem("access-token");
const initialState = token ? { isLoggedIn: true } : { isLoggedIn: false };

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        userId: action.userId,
      };
    case LOGIN_FAIL:
      return {
        isLoggedIn: false,
        userId: null,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoggedIn: false,
        userId: null,
      };
    default:
      return state;
  }
};

export default user;
