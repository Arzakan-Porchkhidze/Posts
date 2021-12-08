import React from "react";
import "Posts/PostFormModal/Index.scss";
import { Modal, Input, Form } from "antd";

const { TextArea } = Input;

export default function PostFormModal({
  postBody,
  postTitle,
  onCancel,
  onOk,
  visible,
  loading,
  title,
  okText,
}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onOk(values);
    form.resetFields();
  };

  return (
    <Modal
      wrapClassName="post-form-modal"
      title={title}
      style={{ top: 100 }}
      visible={visible}
      okText={okText}
      onCancel={() => onCancel(form.getFieldValue("title"))}
      onOk={form.submit}
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          title: postTitle,
          body: postBody,
        }}
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 5, message: "Username must be minimum 5 characters." },
            { max: 50, message: "Username must be minimum 5 characters." },
          ]}
        >
          <Input placeholder="Title" className="input" />
        </Form.Item>
        <Form.Item
          name="body"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 5, message: "Username must be minimum 5 characters." },
            { max: 1000, message: "Username must be minimum 5 characters." },
          ]}
        >
          <TextArea rows={6} placeholder="Body" className="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
