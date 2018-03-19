/* Posts action creator */
const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts( posts ) {
	return {
		type: RECEIVE_POSTS,
		posts
	};
}

module.exports = {
	receivePosts,
	RECEIVE_POSTS
};