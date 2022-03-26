import { authTypes } from '../types/authTypes';

const initialState = {
  currentUser: {},
  token: null,
  isLogged: false
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isLogged: true
      };
    case authTypes.LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isLogged: true
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: {},
        token: null,
        isLogged: false
      };
    default:
      return state;
  }
};
