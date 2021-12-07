import { ActionTypes } from "Reducers/Posts/actionTypes";
import { deletePost, editPosts } from "./utils";

export const initialPostsState = {
  loading: false,
  posts: null,
  error: null,
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case ActionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case ActionTypes.EDIT_POST:
      return {
        ...state,
        posts: editPosts(state.posts, action.payload),
      };

    case ActionTypes.DELETE_POST:
      return {
        ...state,
        posts: deletePost(state.posts, action.payload),
      };
    default:
      return state;
  }
};
