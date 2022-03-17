import { mapTypes } from "../types/mapTypes";

const initialState = {
  coords: [],
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapTypes.GET_COORDS_SUCCESS:
      return {
        ...state,
        coords: action.payload,
      };
    default:
      return state;
  }
};
