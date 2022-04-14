import { call, put, all, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { mapTypes } from "../types/mapTypes";

function* getCoords({ payload }) {
  try {
    const { coords, mapboxgl } = payload;
    const URL = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    ].join("");
    const response = yield call(Axios.get, URL);
    const data = response.data.routes[0];
    const route = data.geometry.coordinates;
    yield put({
      type: mapTypes.GET_COORDS_SUCCESS,
      payload: route,
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* mapSaga() {
  yield all([
    yield takeLatest(mapTypes.GET_COORDS_REQUEST, getCoords),
  ]);
}
