import React from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function PostCard({ title, body }) {
	return (
		<div className="post-card">
			<div className="content">
				<div className="title">{title}</div>
				<div className="body">{body}</div>
			</div>
			<div className="buttons">
				<Button className="delete-button">
					<DeleteOutlined />
				</Button>
				<Button className="edit-button">
					<EditOutlined />
				</Button>
			</div>
		</div>
	);
}
