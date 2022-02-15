import { setApiHeaders, setFileApiHeaders } from "api/api";
import { checkAttend } from "api/attendance";
import { loginUser, getDept } from "api/user";
import { readTimeTable } from "./timetable";

const LOGIN_SUCCESS = "USER/LOGIN_SUCCESS";
const LOGIN_FAIL = "USER/LOGIN_FAIL";
const LOGOUT_SUCCESS = "USER/LOGOUT_SUCCESS";
const ATTEND_SUCCESS = "USER/ATTEND_SUCCESS";
const UPDATE_SUCCESS = "USER/UPDATE_SUCCESS";
const UPDATE_FAIL = "USER/UPDATE_FAIL";

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
        setApiHeaders();
        setFileApiHeaders();

        getDept(userId).then((response) => {
          // checkAttend(userId).then((response) => {
          //   if (response > 0) {

          //   }
          // })
          dispatch({
            type: LOGIN_SUCCESS,
            userId: userId,
            data: response.data,
          });
        });
      }
      dispatch(readTimeTable());
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        error: true,
      });
    });
};

export const updateUserInfo = (userId) => async (dispatch) => {
  getDept(userId)
    .then((res) => {
      dispatch({
        type: UPDATE_SUCCESS,
        userId: userId,
        data: res.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: UPDATE_FAIL,
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

export const attendance = () => {
  return {
    type: ATTEND_SUCCESS,
  };
};

const initialState = {
  isLoggedIn: false,
  userId: "",
  userName: "",
  schoolName: "",
  gradeCode: "",
  classCode: "",
  studentNo: "",
  userCode: "",
  isAttend: false,
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
        gradeCode: action.data.gradeCode,
        classCode: action.data.classCode,
        studentNo: action.data.studentNo,
        userCode: action.data.userCode,
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

    case ATTEND_SUCCESS: {
      return {
        ...state,
        isAttend: true,
      };
    }

    case UPDATE_SUCCESS: {
      return {
        ...state,
        schoolName: action.data.schoolName,
        gradeCode: action.data.gradeCode,
        classCode: action.data.classCode,
        studentNo: action.data.studentNo,
        userCode: action.data.userCode,
      };
    }
    default:
      return state;
  }
};

export default user;
