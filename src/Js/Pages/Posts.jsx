import React, { useState, useReducer, useEffect } from "react";
import { Input } from "antd";
import Modal from "Js/Components/Modal";
import { getPosts, addPostRequest } from "Js/Services/API/index";
import PostCard from "Js/Components/PostCard";
import { initialPostsState, postsReducer } from "Reducers/Posts/reducer";
import {
	fetchPostFail,
	fetchPostSuccess,
	fetchRequest,
	addPost,
} from "Reducers/Posts/actions";
import { initialNewPostState, newPostReducer } from "Reducers/NewPost/reducer";
import { createNewPost, resetState } from "Reducers/NewPost/actions";

export default function Posts() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const [postsState, postsDispatch] = useReducer(
		postsReducer,
		initialPostsState
	);
	const [newPostState, newPostDispatch] = useReducer(
		newPostReducer,
		initialNewPostState
	);

	useEffect(() => {
		(async function () {
			postsDispatch(fetchRequest());
			const response = await getPosts();
			if (response.success) {
				postsDispatch(fetchPostSuccess(response.posts));
			} else {
				postsDispatch(fetchPostFail(response.error));
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
		newPostDispatch(createNewPost(e.target.name, e.target.value));
	};

	const addNewPost = async () => {
		setConfirmLoading(true);
		const response = await addPostRequest(
			newPostState.title,
			newPostState.body
		);
		if (response.success) {
			newPostDispatch(resetState());
			postsDispatch(addPost(response.post));
			setConfirmLoading(false);
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
				{postsState.posts &&
					postsState.posts.map((item) => (
						<PostCard key={item.id} title={item.title} body={item.body} />
					))}
				<Modal
					visible={modalIsVisible}
					onCancel={cancelCreatePost}
					onChange={onChange}
					postTitle={newPostState.title}
					postBody={newPostState.body}
					onOk={addNewPost}
					loading={confirmLoading}
				/>
			</div>
		</div>
	);
}
