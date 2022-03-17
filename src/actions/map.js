import { mapTypes } from "../types/mapTypes";

export const getCoords = (coords) => ({
  type: mapTypes.GET_COORDS_REQUEST,
  payload: coords
});

