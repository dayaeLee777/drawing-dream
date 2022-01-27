import { loginUser, getDept } from "api/user";

const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
const LOGIN_FAIL = "USER/LOGIN_FAIL";
const LOGOUT_SUCCESS = "USER/LOGOUT_SUCCESS";
const GET_DEPT_SUCCESS = "USER/GET_DEPT_SUCCESS";

export const login = (user, isChecked) => async (dispatch) => {
  loginUser(user)
    .then((response) => {
      console.log(response);
      if (response.data) {
        if (isChecked) {
          localStorage.setItem("access-token", response.data.accessToken);
        } else {
          sessionStorage.setItem("access-token", response.data.accessToken);
        }

        const userId = response.data.userId;

        getDept(userId).then((response) => {
          dispatch({
            type: LOGIN_SUCCESS,
            userId: userId,
            data: response.data,
          });
          // dispatch({
          //   type: GET_DEPT_SUCCESS,
          //   data: response,
          // });
        });
      }
    })
    .catch((error) => {
      console.log(error);
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
  ? { isLoggedIn: true, userId: "", userName: "", schoolName: "", error: false }
  : {
      isLoggedIn: false,
      userId: "",
      userName: "",
      schoolName: "",
      error: false,
    };

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        userName: action.data.userName,
        schoolName: action.data.schoolName,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        error: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
      };
    default:
      return state;
  }
};

export default user;
