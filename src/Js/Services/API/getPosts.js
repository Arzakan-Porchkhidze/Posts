const getPosts = async () => {
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

export default getPosts;
