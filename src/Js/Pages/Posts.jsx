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

export default function Posts() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [newPostTitle, setNewPostTitle] = useState("");
	const [newPostBody, setNewPostBody] = useState("");

	const [postsState, postsDispatch] = useReducer(
		postsReducer,
		initialPostsState
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

	const addNewPost = async () => {
		setConfirmLoading(true);
		const response = await addPostRequest(newPostTitle, newPostBody);
		if (response.success) {
			setNewPostBody("");
			setNewPostTitle("");
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
					value={newPostBody}
				/>
				{postsState.posts &&
					postsState.posts.map((item) => (
						<PostCard key={item.id} title={item.title} body={item.body} />
					))}
				<Modal
					visible={modalIsVisible}
					onCancel={cancelCreatePost}
					onChangeTitle={(e) => setNewPostTitle(e.target.value)}
					onChangeBody={(e) => setNewPostBody(e.target.value)}
					postTitle={newPostTitle}
					postBody={newPostBody}
					onOk={addNewPost}
					loading={confirmLoading}
				/>
			</div>
		</div>
	);
}
