import React, { useState } from "react";
import "Posts/PostCard/Index.scss";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostFormModal from "Posts/PostFormModal/Index";
import { editPostRequest } from "Services/API";
import { editPost as editPostAction } from "Reducers/Posts/actions";

export default function PostCard({ id, userId, title, body, postsDispatch }) {
  const [editPostModalIsVisible, setEditPostModalIsVisible] = useState(false);
  const [postBody, setPostBody] = useState(body);
  const [postTitle, setPostTitle] = useState(title);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cancelEditPost = () => {
    setEditPostModalIsVisible(false);
  };

  const editPost = async (post) => {
    setConfirmLoading(true);
    const response = await editPostRequest(post);
    if (response.success) {
      postsDispatch(editPostAction(post));
      setConfirmLoading(false);
      setEditPostModalIsVisible(false);
    }
    setConfirmLoading(false);
  };

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
        <Button
          className="edit-button"
          onClick={() => setEditPostModalIsVisible(true)}
        >
          <EditOutlined />
        </Button>
      </div>

      <PostFormModal
        visible={editPostModalIsVisible}
        onCancel={cancelEditPost}
        onChangeTitle={(e) => setPostTitle(e.target.value)}
        onChangeBody={(e) => setPostBody(e.target.value)}
        postTitle={postTitle}
        postBody={postBody}
        onOk={() => editPost({ id, userId, title: postTitle, body: postBody })}
        loading={confirmLoading}
        title="Edit post"
        okText="Edit"
      />
    </div>
  );
}
