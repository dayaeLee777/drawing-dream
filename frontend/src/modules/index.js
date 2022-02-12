import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import theme from "modules/theme";
import user from "modules/user";
import timetable from "modules/timetable";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["theme", "user", "timetable"],
  //blacklist: ["theme", "user"],
};
const rootReducer = combineReducers({
  theme,
  user,
  timetable,
});

export default persistReducer(persistConfig, rootReducer);
