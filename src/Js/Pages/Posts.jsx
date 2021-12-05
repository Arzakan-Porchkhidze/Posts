import React, { useState } from "react";
import { Input } from "antd";
import Modal from "Js/Components/Modal";

export default function Posts() {
	const [modalIsVisible, setModalIsVisible] = useState(false);

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
