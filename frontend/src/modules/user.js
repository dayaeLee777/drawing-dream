import { loginUser } from "api/user";

const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
const LOGIN_FAIL = "USER/LOGIN_FAIL";
const LOGOUT_SUCCESS = "USER/LOGOUT_SUCCESS";

export const login = (user, isChecked) => async (dispatch) => {
  loginUser(user)
    .then((response) => {
      if (response.headers.authorization && response.data) {
        if (isChecked) {
          localStorage.setItem("access-token", response.headers.authorization);
        } else {
          sessionStorage.setItem(
            "access-token",
            response.headers.authorization
          );
        }
        dispatch({
          type: LOGIN_SUCCESS,
          userId: response.data,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAIL,
        error: true,
      });
    });
};

export const logout = () => {
  sessionStorage.removeItem("access-token");
  localStorage.removeItem("access-token");
  return {
    type: LOGOUT_SUCCESS,
  };
};

const token =
  sessionStorage.getItem("access-token") ||
  localStorage.getItem("access-token");

const initialState = token
  ? { isLoggedIn: true, error: false }
  : { isLoggedIn: false, error: false };

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
        error: true,
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
