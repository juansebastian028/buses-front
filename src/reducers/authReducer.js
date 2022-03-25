import { authTypes } from '../types/authTypes';

const initialState = {
  currentUser: {},
  token: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    case authTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
