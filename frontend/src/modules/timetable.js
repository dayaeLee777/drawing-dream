import { getTimeTable } from "api/timetable";

const READ_TIMETABLE_SUCCESS = "TIEMTABLE/READ_TIMETABLE_SUCCESS";
const READ_TIMETABLE_FAIL = "TIEMTABLE/READ_TIMETABLE_FAIL";

export const readTimeTable = () => async (dispatch) => {
  getTimeTable()
    .then((res) => {
      // console.log(res.data.timeTableGetListResponseDTOs);
      dispatch({
        type: READ_TIMETABLE_SUCCESS,
        data: res.data.timeTableGetListResponseDTOs,
      });
    })
    .catch(() => {
      dispatch({
        type: READ_TIMETABLE_FAIL,
        error: true,
      });
    });
};

const initialState = {};

const timetable = (state = initialState, action) => {
  switch (action.type) {
    case READ_TIMETABLE_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default timetable;
