import {select} from 'redux-saga/effects';
import Axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { message } from "antd";
import { postTypes } from '../types/postTypes';

function* listPosts() {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/posts`;
    const res = yield call(Axios.get, URL);
    const { data } = res;
    if (!data.success) {
        message("error", data.msg);
      } else {
        yield put({
          type: postTypes.GET_LIST_POSTS_SUCCESS,
          payload: data.posts,
        });
      }
  } catch (error) {
    console.log(error);
  }
}

function* removePost({ payload }) {
  try {
    const { token } = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/posts/${payload}`;
    const res = yield Axios({
      method: "DELETE",
      url: URL,
      type: postTypes.DELETE_POST_SUCCESS,
      data: payload,
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (!data.success) {
      message("error", data.msg);
    } else {
      yield put({ type: postTypes.DELETE_POST_SUCCESS, payload: data.post });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addPost({ payload }) {
  try {
    const { token } = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/posts`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    console.log(res)
    if (!data.success) {
      message("error", data.msg);
    } else {
      yield put({ type: postTypes.ADD_POST_SUCCESS, payload: data.post });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePost({ payload }) {
  try {
    const { token } = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/posts/${payload.id}`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      type: postTypes.UPDATE_POST_SUCCESS,
      data: payload,
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (!data.success) {
      message("error", data.msg);
    } else {
      yield put({ type: postTypes.UPDATE_POST_SUCCESS, payload: data.post });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* POSTSaga() {
  yield all([
    yield takeLatest(postTypes.GET_LIST_POSTS_REQUEST, listPosts),
    yield takeLatest(postTypes.DELETE_POST_REQUEST, removePost),
    yield takeLatest(postTypes.ADD_POST_REQUEST, addPost),
    yield takeLatest(postTypes.UPDATE_POST_REQUEST, updatePost),
  ]);
}
