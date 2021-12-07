export const getPostsRequest = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return {
      success: true,
      posts,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const addPostRequest = async (title, body) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const post = await response.json();
    return {
      success: true,
      post,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const editPostRequest = async (post) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const editedPost = await response.json();
    return {
      success: true,
      editedPost,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const deletePostRequest = async (postId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
