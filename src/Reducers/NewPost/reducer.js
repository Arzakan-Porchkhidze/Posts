import { ActionTypes } from "Reducers/NewPost/actionTypes";

export const initialNewPostState = {
	title: "",
	body: "",
};

export const newPostReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.CREATE_POST:
			return {
				...state,
				[action.name]: action.value,
			};
		case ActionTypes.RESET:
			return {
				title: "",
				body: "",
			};
		default:
			return state;
	}
};
