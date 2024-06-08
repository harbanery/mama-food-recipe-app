import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import validationReducer from "./validationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  validation: validationReducer,
});

export default rootReducer;
