import { ActionTypes } from "Reducers/NewPost/actionTypes";

export const createNewPost = (name, value) => ({
	type: ActionTypes.CREATE_POST,
	name,
	value,
});

export const resetState = () => ({
	type: ActionTypes.RESET,
});
