import { AsyncStorage } from "react-native";
import loginReducer from "./loginReducer";
import inputReducer from "./inputReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import homeReducer from "./homeReducer";
import adoptionReducer from "./adoptionReducer";
import onlineForumReducer from "./onlineForumReducer";
import eventReducer from "./eventReducer";
import sosReducer from "./sosReducer";
import LOGOUT from "../actions/types";
import { persistCombineReducers } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const appReducer = persistCombineReducers(persistConfig, {
  login: loginReducer,
  input: inputReducer,
  auth: authReducer,
  alert: alertReducer,
  home: homeReducer,
  adoption: adoptionReducer,
  onlineForum: onlineForumReducer,
  event: eventReducer,
  sos: sosReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state.login = undefined;
    state.input = undefined;
    state.auth = undefined;
    state.alert = undefined;
    state.home = undefined;
    state.adoption = undefined;
    state.onlineForum = undefined;
    state.event = undefined;
    state.sos = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
