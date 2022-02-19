import { call, put, all, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { busRoutesTypes } from '../types/busRoutesTypes';

function* listBusRoutes() {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const response = yield call(Axios.get, URL);
    yield put({
      type: busRoutesTypes.GET_LIST_BUS_ROUTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

function* removeBusRoute({ payload }) {
  try {
    const URL = `https://jsonplaceholder.typicode.com/users/${payload}`;
    yield call(Axios.delete, URL);
    yield put({ type: busRoutesTypes.DELETE_BUS_ROUTE_SUCCESS, payload });
  } catch (error) {
    console.log(error);
  }
}

function* addBusRoute({ payload }) {
  try {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    yield call(Axios.post, URL);
    yield put({ type: busRoutesTypes.ADD_BUS_ROUTE_SUCCESS, payload });
  } catch (error) {
    console.log(error);
  }
}

function* updateBusRoute({ payload }) {
  try {
    const URL = `https://jsonplaceholder.typicode.com/users/${payload.id}`;
    yield call(Axios.put, URL);
    yield put({ type: busRoutesTypes.UPDATE_BUS_ROUTE_SUCCESS, payload });
  } catch (error) {
    console.log(error);
  }
}

export default function* busRoutesSaga() {
  yield all([
    yield takeLatest(busRoutesTypes.GET_LIST_BUS_ROUTES_REQUEST, listBusRoutes),
    yield takeLatest(busRoutesTypes.DELETE_BUS_ROUTE_REQUEST, removeBusRoute),
    yield takeLatest(busRoutesTypes.ADD_BUS_ROUTE_REQUEST, addBusRoute),
    yield takeLatest(busRoutesTypes.UPDATE_BUS_ROUTE_REQUEST, updateBusRoute),
  ]);
}
