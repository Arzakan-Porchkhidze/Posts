export const getPosts = async () => {
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
