import {select} from 'redux-saga/effects';
import Axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { message } from "antd";
import { userTypes } from '../types/userTypes';
import { authTypes } from '../types/authTypes';

function* listUsers() {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/users`;
    const response = yield call(Axios.get, URL);
    yield put({
      type: userTypes.GET_LIST_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* removeUser({ payload }) {
  try {
    const {token} = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/users/${payload}`;
    const res = yield Axios({
      method: "DELETE",
      url: URL,
      type: userTypes.DELETE_USER_SUCCESS,
      data: payload,
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: userTypes.DELETE_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addUser({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/users`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: userTypes.ADD_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateUser({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/users/${payload.id}`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      type: userTypes.UPDATE_USER_SUCCESS,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: userTypes.UPDATE_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCurrentUser({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/users/${payload.id}`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      type: userTypes.UPDATE_CURRENT_USER_SUCCESS,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: authTypes.UPDATE_CURRENT_USER, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* userSaga() {
  yield all([
    yield takeLatest(userTypes.GET_LIST_USERS_REQUEST, listUsers),
    yield takeLatest(userTypes.DELETE_USER_REQUEST, removeUser),
    yield takeLatest(userTypes.ADD_USER_REQUEST, addUser),
    yield takeLatest(userTypes.UPDATE_USER_REQUEST, updateUser),
    yield takeLatest(userTypes.UPDATE_CURRENT_USER_REQUEST, updateCurrentUser)
  ]);
}
