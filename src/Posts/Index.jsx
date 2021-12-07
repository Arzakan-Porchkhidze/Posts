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
  const [newPostBody, setNewPostBody] = useState("");

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

  const cancelCreatePost = () => {
    setCreatePostModalIsVisible(false);
  };

  const openCreatePostModal = () => {
    setCreatePostModalIsVisible(true);
  };

  const addNewPost = async () => {
    setConfirmLoading(true);
    const response = await addPostRequest(newPostTitle, newPostBody);
    if (response.success) {
      setNewPostBody("");
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
          value={newPostBody}
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
          onChangeTitle={(e) => setNewPostTitle(e.target.value)}
          onChangeBody={(e) => setNewPostBody(e.target.value)}
          postTitle={newPostTitle}
          postBody={newPostBody}
          onOk={addNewPost}
          loading={confirmLoading}
          title="Create your post"
          okText="Post"
        />
      </div>
    </div>
  );
}
