import React, { useState, useReducer, useEffect } from "react";
import "Posts/Index.scss";
import { Input } from "antd";
import PostFormModal from "Posts/PostFormModal/Index";
import { getPostsRequest, addPostRequest } from "Services/API/index";
import PostCard from "Posts/PostCard/Index";
import { initialPostsState, postsReducer } from "Reducers/Posts/reducer";
import {
  fetchPostFail,
  fetchPostSuccess,
  fetchRequest,
  addPost,
} from "Reducers/Posts/actions";

export default function Posts() {
  const [createPostModalIsVisible, setCreatePostModalIsVisible] =
    useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");

  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState
  );

  useEffect(() => {
    (async function () {
      postsDispatch(fetchRequest());
      const response = await getPostsRequest();
      if (response.success) {
        postsDispatch(fetchPostSuccess(response.posts));
      } else {
        postsDispatch(fetchPostFail(response.error));
      }
    })();
  }, []);

  const cancelCreatePost = (title) => {
    setCreatePostModalIsVisible(false);
    setNewPostTitle(title);
  };

  const openCreatePostModal = () => {
    setCreatePostModalIsVisible(true);
  };

  const addNewPost = async ({ title, body }) => {
    setConfirmLoading(true);
    setNewPostTitle(title);
    const response = await addPostRequest(title, body);
    if (response.success) {
      setNewPostTitle("");
      postsDispatch(addPost(response.post));
      setConfirmLoading(false);
      setCreatePostModalIsVisible(false);
    }
  };

  return (
    <div className="posts">
      <div className="content">
        <Input
          placeholder="Create your post"
          onClick={openCreatePostModal}
          className="input"
          value={newPostTitle}
        />
        {postsState.posts &&
          postsState.posts.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              userId={item.userId}
              title={item.title}
              body={item.body}
              postsDispatch={postsDispatch}
            />
          ))}
        <PostFormModal
          visible={createPostModalIsVisible}
          onCancel={cancelCreatePost}
          onOk={addNewPost}
          loading={confirmLoading}
          title="Create your post"
          okText="Post"
        />
      </div>
    </div>
  );
}
