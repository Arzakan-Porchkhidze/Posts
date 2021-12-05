import React, { useState, useReducer, useEffect } from "react";
import { Input } from "antd";
import Modal from "Js/Components/Modal";
import getPosts from "Js/Services/API/getPosts";
import addPost from "Js/Services/API/addPost";

const initialNewPostState = {
	title: "",
	body: "",
};

const initialState = {
	loading: false,
	posts: {},
	error: null,
};

function newPostReducer(state, action) {
	switch (action.type) {
		case "reset":
			return {
				title: "",
				body: "",
			};
		default:
			return {
				...state,
				[action.name]: action.value,
			};
	}
}

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				loading: true,
			};
		case "fetchPostsSuccess":
			return {
				...state,
				loading: false,
				posts: action.payload,
			};
		case "fetchPostsFail":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case "addPost":
			return {
				...state,
				posts: [...state.posts, action.payload],
			};
		default:
			return state;
	}
}

export default function Posts() {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const [state, dispatch] = useReducer(reducer, initialState);
	const [newPostState, newPostDispatch] = useReducer(
		newPostReducer,
		initialNewPostState
	);

	useEffect(() => {
		(async function () {
			dispatch({ type: "loading" });
			const response = await getPosts();
			if (response.success) {
				dispatch({ type: "fetchPostsSuccess", payload: response.posts });
			} else {
				dispatch({ type: "fetchPostsFail", payload: response.error });
			}
		})();
	}, []);

	const cancelCreatePost = () => {
		setModalIsVisible(false);
	};

	const openModal = () => {
		setModalIsVisible(true);
	};

	const onChange = (e) => {
		newPostDispatch({ name: e.target.name, value: e.target.value });
	};

	const addNewPost = async () => {
		const response = await addPost(newPostState.title, newPostState.body);
		if (response.success) {
			newPostDispatch({ type: "reset" });
			dispatch({ type: "addPost", payload: response.post });
			setModalIsVisible(false);
		}
	};

	return (
		<div className="posts">
			<div className="content">
				<Input
					placeholder="Create your post"
					onClick={openModal}
					className="input"
					value={newPostState.body}
				/>
				<Modal
					visible={modalIsVisible}
					onCancel={cancelCreatePost}
					onChange={onChange}
					postTitle={newPostState.title}
					postBody={newPostState.body}
					onOk={addNewPost}
				/>
			</div>
		</div>
	);
}
