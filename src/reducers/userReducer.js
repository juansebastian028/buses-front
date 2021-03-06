import { userTypes } from '../types/userTypes';

const initialState = {
  users: [],
  isLoading: true,
  activeUser: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.GET_LIST_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
      };
    case userTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => (user.uid === action.payload.uid ? action.payload : user)),
      };
    case userTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.uid !== action.payload.uid),
      };
    case userTypes.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload,
      };
    case userTypes.CLEAR_ACTIVE_USER:
      return {
        ...state,
        activeUser: null,
      };
    case userTypes.UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => (user.uid === action.payload.uid ? action.payload : user)),
      };
    default:
      return state;
  }
};
