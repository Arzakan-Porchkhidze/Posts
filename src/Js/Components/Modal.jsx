import React from "react";
import { Modal as AntdModal, Input } from "antd";

const { TextArea } = Input;

export default function Modal({ visible, onCancel, onOk, value }) {
	return (
		<AntdModal
			wrapClassName="modal"
			title="Create your post"
			style={{ top: 100 }}
			visible={visible}
			okText="Post"
			onCancel={onCancel}
			onOk={onOk}
		>
			<TextArea rows={6} value={value} className="textarea" />
		</AntdModal>
	);
}
