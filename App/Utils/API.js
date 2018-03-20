/* API */
import { _getPosts } from './mockData.js';

export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function getInitialData() {
	_getPosts()
	  .then( data => data );
}

export function findMatch(wordToFind, array){
  /* Will return a new array filtered by matching of input
    string
  */
  return array.filter(item => {
    let regex = new RegExp(wordToFind, 'gi');
    let foundMatch = false,
	    i;
    const len = item.keywords.length;
	
	for( i = 0; i < len; i++ ) {
		if( item.keywords[i].match( regex ) ) {
			foundMatch = true;
		}
	}
	
	return foundMatch;
  });
  
}

export function prepareTags( str ) {
	const regex = /,\s*/;
	
	return str.split( regex );
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
