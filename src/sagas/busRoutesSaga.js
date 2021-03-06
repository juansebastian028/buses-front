import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import Axios from 'axios';
import { message } from "antd";
import { busRoutesTypes } from '../types/busRoutesTypes';

function* listBusRoutes() {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes`;
    const response = yield call(Axios.get, URL);
    yield put({
      type: busRoutesTypes.GET_LIST_BUS_ROUTES_SUCCESS,
      payload: response.data.busRoutes,
    });
  } catch (error) {
    console.log(error);
  }
}

function* getBusRoute({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes/${payload}`;
    const res = yield Axios({
      method: "GET",
      url: URL,
    });
    const { data } = res;
    if (!data.success) {
      message("error", data.msg);
    } else {
      yield put({ type:  busRoutesTypes.GET_BUS_ROUTE_SUCCESS, payload: data.busRoute });
    }
  } catch (error) {
    console.log(error);
  }
}

function* removeBusRoute({ payload }) {
  try {
    const {token} = yield select((state) => state.auth);
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes/${payload}`;
    const res = yield Axios({
      method: "DELETE",
      url: URL,
      type: busRoutesTypes.DELETE_BUS_ROUTE_SUCCESS,
      headers: {
        'x-token': token
      }
    });
    const { data } = res;
    if (data.msg) {
      message.error(data.msg);
    } else {
      message.success('Ruta eliminada exitosamente.');
      yield put({ type:  busRoutesTypes.DELETE_BUS_ROUTE_SUCCESS, payload: data.uid });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addBusRoute({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes`;
    const res = yield Axios({
      method: "POST",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message.error(data.msg);
    } else {
      message.success('Ruta guardada exitosamente.');
      yield put({ type: busRoutesTypes.ADD_BUS_ROUTE_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateBusRoute({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes/${payload.id}`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      type: busRoutesTypes.UPDATE_BUS_ROUTE_SUCCESS,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message.error(data.msg);
    } else {
      message.success('Ruta actualizada exitosamente.');
      yield put({ type: busRoutesTypes.UPDATE_BUS_ROUTE_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

function* addComment({ payload }) {
  try {
    const URL = `${process.env.REACT_APP_API_URL}/bus-routes/${payload.id}/comments`;
    const res = yield Axios({
      method: "PUT",
      url: URL,
      data: payload,
    });
    const { data } = res;
    if (data.msg) {
      message("error", data.msg);
    } else {
      yield put({ type: busRoutesTypes.ADD_COMMENT_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* busRoutesSaga() {
  yield all([
    yield takeLatest(busRoutesTypes.GET_LIST_BUS_ROUTES_REQUEST, listBusRoutes),
    yield takeLatest(busRoutesTypes.GET_BUS_ROUTE_REQUEST, getBusRoute),
    yield takeLatest(busRoutesTypes.DELETE_BUS_ROUTE_REQUEST, removeBusRoute),
    yield takeLatest(busRoutesTypes.ADD_BUS_ROUTE_REQUEST, addBusRoute),
    yield takeLatest(busRoutesTypes.UPDATE_BUS_ROUTE_REQUEST, updateBusRoute),
    yield takeLatest(busRoutesTypes.ADD_COMMENT_REQUEST, addComment),
  ]);
}
