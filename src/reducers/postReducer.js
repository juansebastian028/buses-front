import { postTypes } from '../types/postTypes';

const initialState = {
  posts: [],
  isLoading: true,
  activePost: null,
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.GET_LIST_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case postTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case postTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => (post.uid === action.payload.uid ? action.payload : post)),
      };
    case postTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.uid !== action.payload.uid),
      };
    case postTypes.SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.payload,
      };
    case postTypes.CLEAR_ACTIVE_POST:
      return {
        ...state,
        activePost: null,
      };
    default:
      return state;
  }
};
