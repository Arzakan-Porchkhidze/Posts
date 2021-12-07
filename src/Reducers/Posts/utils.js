export const editPosts = (posts, post) => {
  const existingPostIndex = posts.findIndex((item) => item.id === post.id);

  if (existingPostIndex >= 0) {
    posts[existingPostIndex] = post;
    return posts;
  }
  return posts;
};
