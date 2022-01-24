import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import theme from "./theme";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  //   whitelist:
  blacklist: ["theme"],
};
const rootReducer = combineReducers({
  theme,
});

export default persistReducer(persistConfig, rootReducer);
