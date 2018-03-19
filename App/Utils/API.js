/* API */
import { _getPosts } from './mockData.js';

export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function getInitialData() {
	_getPosts()
	  .then( data => data );
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
