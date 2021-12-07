export const editPosts = (posts, post) => {
  const existingPostIndex = posts.findIndex((item) => item.id === post.id);

  if (existingPostIndex >= 0) {
    posts[existingPostIndex] = post;
    return posts;
  }
  return posts;
};

export const deletePost = (posts, postId) => {
  const newPosts = posts.filter((item) => item.id !== postId);
  return newPosts;
};
