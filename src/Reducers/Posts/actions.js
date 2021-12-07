import { ActionTypes } from "Reducers/Posts/actionTypes";

export const fetchRequest = () => ({
  type: ActionTypes.FETCH_REQUEST_LOADING,
});

export const fetchPostSuccess = (posts) => ({
  type: ActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostFail = (error) => ({
  type: ActionTypes.FETCH_POSTS_FAIL,
  payload: error,
});

export const addPost = (post) => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});

export const editPost = (post) => ({
  type: ActionTypes.EDIT_POST,
  payload: post,
});
