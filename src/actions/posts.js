import { postTypes } from "../types/postTypes";

export const getListPosts = () => ({
  type: postTypes.GET_LIST_POSTS_REQUEST,
});

export const postDeleted = (id) => ({
  type: postTypes.DELETE_POST_REQUEST,
  payload: id
}); 

export const postAdded = (post) => ({
  type: postTypes.ADD_POST_REQUEST,
  payload: post
})

export const postUpdated = (post) => ({
  type: postTypes.UPDATE_POST_REQUEST,
  payload: post
})

export const clearActivePost = () => ({
  type: postTypes.CLEAR_ACTIVE_POST
})

export const setActivePost = (post) => ({
  type: postTypes.SET_ACTIVE_POST,
  payload: post
})

export const updateCurrentPost = (post) => ({
  type: postTypes.UPDATE_CURRENT_POST_REQUEST,
  payload: post
})

