import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import theme from "modules/theme";
import user from "modules/user";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["theme", "user"],
  //blacklist: ["theme", "user"],
};
const rootReducer = combineReducers({
  theme,
  user,
});

export default persistReducer(persistConfig, rootReducer);
