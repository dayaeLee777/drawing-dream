import { getPeriod, getTimeTable } from "api/timetable";

const READ_TIMETABLE_SUCCESS = "TIMETABLE/READ_TIMETABLE_SUCCESS";
const READ_TIMETABLE_FAIL = "TIMETABLE/READ_TIMETABLE_FAIL";
const GET_PERIOD_SUCCESS = "TIMETABLE/GET_PERIOD_SUCCESS";
const GET_PERIOD_FAIL = "TIMETABLE/GET_PERIOD_FAIL";

export const readTimeTable = () => async (dispatch) => {
  let d = new Date();
  var week = new Array("H05", "H01", "H02", "H03", "H04", "H05", "H05");
  getPeriod()
    .then((res) => {
      const periodData = res.data;
      // console.log(res.data);
      getTimeTable()
        .then((res) => {
          dispatch({
            type: READ_TIMETABLE_SUCCESS,
            data: res.data.timeTableGetListResponseDTOs,
            todayData: res.data.timeTableGetListResponseDTOs.filter(
              (data) => data.dayCode === week[d.getDay()]
            ),
            today: week[d.getDay()],
            period: periodData,
          });
        })
        .catch(() => {
          dispatch({
            type: READ_TIMETABLE_FAIL,
            error: true,
          });
        });
    })
    .catch(() => {
      dispatch({
        type: GET_PERIOD_FAIL,
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
        period: action.period,
      };
    default:
      return state;
  }
};

export default timetable;
