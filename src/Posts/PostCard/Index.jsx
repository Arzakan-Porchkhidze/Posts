import React, { useState } from "react";
import "Posts/PostCard/Index.scss";
import { Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostFormModal from "Posts/PostFormModal/Index";
import { deletePostRequest, editPostRequest } from "Services/API";
import {
  editPost as editPostAction,
  deletePost as deletePostAction,
} from "Reducers/Posts/actions";

export default function PostCard({ id, userId, title, body, postsDispatch }) {
  const [editPostModalIsVisible, setEditPostModalIsVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cancelEditPost = () => {
    setEditPostModalIsVisible(false);
  };

  const editPost = async (post) => {
    setConfirmLoading(true);
    const response = await editPostRequest(post);
    if (response.success) {
      postsDispatch(editPostAction(response.editedPost));
      setConfirmLoading(false);
      setEditPostModalIsVisible(false);
    }
    setConfirmLoading(false);
  };

  const deletePost = async (postId) => {
    const response = await deletePostRequest(postId);
    if (response.success) {
      postsDispatch(deletePostAction(postId));
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Delete post",
      content: "You want to delete post?",
      okText: "delete",
      cancelText: "cancel",
      onOk: () => deletePost(id),
    });
  };
  return (
    <div className="post-card">
      <div className="content">
        <div className="title">{title}</div>
        <div className="body">{body}</div>
      </div>
      <div className="buttons">
        <Button className="delete-button" onClick={confirmDelete}>
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
        postTitle={title}
        postBody={body}
        onCancel={cancelEditPost}
        onOk={({ title, body }) => editPost({ id, userId, title, body })}
        loading={confirmLoading}
        title="Edit post"
        okText="Edit"
      />
    </div>
  );
}
