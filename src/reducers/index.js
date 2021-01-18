import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import tagscanReducer from "./tagscan.reducer";
import labelscanReducer from "./labelscan.reducer"
export default combineReducers({
  loginReducer,
  tagscanReducer,
  labelscanReducer,
  
});
