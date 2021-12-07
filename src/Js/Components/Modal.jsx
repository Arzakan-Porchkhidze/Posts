import React from "react";
import { Modal as AntdModal, Input } from "antd";

const { TextArea } = Input;

export default function Modal({
	postBody,
	postTitle,
	onCancel,
	onOk,
	onChangeTitle,
	onChangeBody,
	visible,
	loading,
}) {
	return (
		<AntdModal
			wrapClassName="modal"
			title="Create your post"
			style={{ top: 100 }}
			visible={visible}
			okText="Post"
			onCancel={onCancel}
			onOk={onOk}
			confirmLoading={loading}
		>
			<Input
				placeholder="Title"
				className="input"
				name="title"
				value={postTitle}
				onChange={onChangeTitle}
			/>
			<TextArea
				rows={6}
				value={postBody}
				className="textarea"
				name="body"
				onChange={onChangeBody}
			/>
		</AntdModal>
	);
}
