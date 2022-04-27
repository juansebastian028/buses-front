import { authTypes } from '../types/authTypes';

const initialState = {
  currentUser: {},
  token: null,
  isLogged: false,
  roles: []
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
      case authTypes.GET_LIST_ROLES_SUCCESS:
        return {
          ...state,
          roles: action.payload
        };
      case authTypes.ADD_BUS_ROUTE_TO_FAVOURITES_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
        };
      case authTypes.REMOVE_BUS_ROUTE_FROM_FAVOURITES_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
        };
    default:
      return state;
  }
};
