import { getTimeTable } from "api/timetable";

const READ_TIMETABLE_SUCCESS = "TIEMTABLE/READ_TIMETABLE_SUCCESS";
const READ_TIMETABLE_FAIL = "TIEMTABLE/READ_TIMETABLE_FAIL";

export const readTimeTable = () => async (dispatch) => {
  let d = new Date();
  var week = new Array("H05", "H01", "H02", "H03", "H04", "H05", "H05");

  getTimeTable()
    .then((res) => {
      // console.log(res.data.timeTableGetListResponseDTOs);
      dispatch({
        type: READ_TIMETABLE_SUCCESS,
        data: res.data.timeTableGetListResponseDTOs,
        todayData: res.data.timeTableGetListResponseDTOs.filter(
          (data) => data.dayCode === week[d.getDay()]
        ),
        today: week[d.getDay()],
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
        todayData: action.todayData,
        today: action.today,
      };
    default:
      return state;
  }
};

export default timetable;
