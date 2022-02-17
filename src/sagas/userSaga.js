import { call, put, all, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { userTypes } from '../types/userTypes';

function* listUsers() {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
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
    const URL = `https://jsonplaceholder.typicode.com/users/${payload}`;
    yield call(Axios.delete, URL);
    yield put({ type: userTypes.DELETE_USER_SUCCESS, payload });
  } catch (error) {
    console.log(error);
  }
}

function* addUser({ payload }) {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    yield call(Axios.post, URL);
    yield put({ type: userTypes.ADD_USER_SUCCESS, payload });
  } catch (error) {
    console.log(error);
  }
}

function* updateUser({ payload }) {
  try {
    const URL = `https://jsonplaceholder.typicode.com/users/${payload.id}`;
    yield call(Axios.put, URL);
    yield put({ type: userTypes.UPDATE_USER_SUCCESS, payload });
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
  ]);
}
