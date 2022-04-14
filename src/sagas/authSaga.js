import Axios from "axios";
import { put, all, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import { authTypes } from "../types/authTypes";

function* login({ payload, navigate }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/auth/login`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: authTypes.LOGIN_SUCCESS, payload: data });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
}

function* loginWithGoogleSignIn({ payload, navigate }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/auth/google`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: authTypes.LOGIN_GOOGLE_SUCCESS, payload: data });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
}

function* logout({ navigate }) {
  yield put({ type: authTypes.LOGOUT_SUCCESS });
  navigate("/login");
}

export default function* authSaga() {
  yield all([
    yield takeLatest(authTypes.LOGIN_REQUEST, login),
    yield takeLatest(authTypes.LOGIN_GOOGLE_REQUEST, loginWithGoogleSignIn),
    yield takeLatest(authTypes.LOGOUT_REQUEST, logout),
  ]);
}
