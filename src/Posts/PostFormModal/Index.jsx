import React from "react";
import "Posts/PostFormModal/Index.scss";
import { Modal as AntdModal, Input } from "antd";

const { TextArea } = Input;

export default function PostFormModal({
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
      wrapClassName="post-form-modal"
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
