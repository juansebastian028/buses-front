import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import busRoutesSaga from './busRoutesSaga';
import authSaga from './authSaga';
import postSaga from './postSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    busRoutesSaga(),
    authSaga(),
    postSaga()
  ]);
}
