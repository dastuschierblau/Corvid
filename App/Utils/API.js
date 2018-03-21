/* API */
import { _getPosts } from './mockData.js';


export function getInitialData() {
	return _getPosts();
}


/* To be implemented later */
function savePost( post ) {
	return new Promise(( res, rej ) => {
		setTimeout(() => res( post ), 1000 );
	});
}

function createPost( post ) {
	return new Promise(( res, rej ) => {
		setTimeout(() => res( post ), 1000 );
	});
}

function deletePost( post ) {
	return setTimeout(() => {
		return Promise.resolve( post );
	}, 1000 );
}
