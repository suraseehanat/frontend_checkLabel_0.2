import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGIN_STATUS,
} from "../Constants";
import axios from "axios";
export const setStateToFetching = () => ({
  type: LOGIN_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const setStateToFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload: payload,
});

export const setStateToLogout = () => ({
  type: LOGOUT,
});

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    const result = await axios.post("/apis/login", {
      username,
      password,
    });
    if (result.data == "incorrect") {
      if (username === "" || password === "") {
        var msg = "กรุณากรอก username และ password";
      } else {
        var msg =
          "ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก username หรือ password ไม่ถูกต้อง";
      }
      localStorage.setItem(LOGIN_STATUS, "fail");
      dispatch(setStateToFailed(msg));
    } else {
      localStorage.setItem(LOGIN_STATUS, "success");
      dispatch(setStateToSuccess("success"));
      history.push("/TagScan");
    }
  };
};

export const logout = ({ history }) => {
  return (dispatch) => {
    localStorage.removeItem(LOGIN_STATUS);
    dispatch(setStateToLogout());
    history.push("/");
  };
};

export const reLogin = () => {
  return (dispatch) => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS);
    if (loginStatus == "success") {
      dispatch(setStateToSuccess({}));
    }
  };
};

export const hasError = (payload) => {
  return (dispatch) => {
    dispatch(setStateToFailed(payload));
  };
};

export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS);
  return loginStatus == "success";
};
