import Axios from "axios";
import { call, put, all, takeLatest, select } from "redux-saga/effects";
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
    console.log(data);
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
  navigate("/");
}

function* listRoles() {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/roles`;
    const response = yield call(Axios.get, URL);
    yield put({
      type: authTypes.GET_LIST_ROLES_SUCCESS,
      payload: response.data.roles,
    });
  } catch (error) {
    console.log(error);
  }
}

function* addToFavourites({ userId, busRouteId }) {
  try {
    const {token} = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/users/${userId}/busRoute`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: { busRouteId },
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: authTypes.ADD_BUS_ROUTE_TO_FAVOURITES_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* removeFromFavourites({ userId, busRouteId }) {
  try {
    const {token} = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/users/${userId}/busRoute`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      data: { busRouteId },
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: authTypes.REMOVE_BUS_ROUTE_FROM_FAVOURITES_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield all([
    yield takeLatest(authTypes.LOGIN_REQUEST, login),
    yield takeLatest(authTypes.LOGIN_GOOGLE_REQUEST, loginWithGoogleSignIn),
    yield takeLatest(authTypes.LOGOUT_REQUEST, logout),
    yield takeLatest(authTypes.GET_LIST_ROLES_REQUEST, listRoles),
    yield takeLatest(authTypes.ADD_BUS_ROUTE_TO_FAVOURITES_REQUEST, addToFavourites),
    yield takeLatest(authTypes.REMOVE_BUS_ROUTE_FROM_FAVOURITES_REQUEST, removeFromFavourites),
  ]);
}
