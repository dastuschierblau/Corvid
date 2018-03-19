/* Index reducers file */
const { RECEIVE_POSTS } = require( '../Actions/posts.js' );
const ADD_POST = 'ADD_POST';

function posts ( state = [], action ) {
  switch( action.type ) {
    case RECEIVE_POSTS:
	  return [
	     ...state,
		 ...action.posts
	  ];
	case ADD_POST:
	  return state.concat([ action.post ]);

	default:
	  return state;
  }
}

module.exports = posts;