import { authTypes } from '../types/authTypes';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
  token: localStorage.getItem('token'),
  isLogged: false
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isLogged: true
      };
    case authTypes.LOGIN_GOOGLE_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
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
