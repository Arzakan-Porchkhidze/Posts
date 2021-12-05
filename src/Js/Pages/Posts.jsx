import React, { useState, useReducer, useEffect } from "react";
import { Input } from "antd";
import Modal from "Js/Components/Modal";
import getPosts from "Js/Services/API/getPosts";

const initialState = {
	loading: false,
	posts: {},
	error: null,
};

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
		default:
			return state;
	}
}

export default function Posts() {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const [state, dispatch] = useReducer(reducer, initialState);

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

	return (
		<div className="posts">
			<div className="content">
				<Input
					placeholder="Create your post"
					onClick={openModal}
					className="input"
				/>
				<Modal visible={modalIsVisible} onCancel={cancelCreatePost} />
			</div>
		</div>
	);
}
