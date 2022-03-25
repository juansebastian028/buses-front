import Axios from "axios";
import { put, all, takeLatest } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import { message } from 'antd';
import { authTypes } from "../types/authTypes";

const history = createBrowserHistory();

function* login({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/auth/login`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message('error', data.msg);
    } else {
      yield put({ type: authTypes.LOGIN_SUCCESS, payload: data });
      history.push('/');
    }
  } catch (error) {
    console.log(error);
  }
}

function* loginWithGoogleSignIn({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/auth/google`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message('error', data.msg);
    } else {
      yield put({ type: authTypes.LOGIN_GOOGLE_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield all([
    yield takeLatest(authTypes.LOGIN_REQUEST, login),
    yield takeLatest(authTypes.LOGIN_GOOGLE_REQUEST, loginWithGoogleSignIn),
  ]);
}
