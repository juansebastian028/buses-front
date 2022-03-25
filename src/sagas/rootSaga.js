import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import busRoutesSaga from './busRoutesSaga';
import mapSaga from './mapSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    busRoutesSaga(),
    mapSaga(),
    authSaga()
  ]);
}
