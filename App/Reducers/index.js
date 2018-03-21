/* Index reducers file */
const RECEIVE_POSTS = 'RECEIVE_POSTS',
      ADD_POST = 'ADD_POST',
	  TOGGLE_POST = 'SET_POST',
	  TOGGLE_LOADING = 'TOGGLE_LOADING',
	  REMOVE_POST = 'REMOVE_POST',
	  LOAD_SUGGESTIONS = 'LOAD_SUGGESTIONS',
	  RESET_SUGGESTIONS = 'RESET_SUGGESTIONS',
	  USER_LOGIN = 'USER_LOGIN';

export function posts ( state = [], action ) {
  switch( action.type ) {
    case RECEIVE_POSTS:
	  return state.concat( ...action.posts );
	  
	case ADD_POST:
	  return state.concat([ action.post ]);
	  
    case REMOVE_POST:
	  return state.filter( item => item.id !== action.id );
	  
	case TOGGLE_POST: 
	  return state.map( item => item.id !== action.id ?
	    item : Object.assign( {}, item, { current: !item.current } )
	);
	default:
	  return state;
  }
}
export function userAuth ( state = {}, action ) {
	switch( action.type ) {
		case USER_LOGIN:
		  return Object.assign( {}, state.userAuth, { user: action.username, logged: true } );
		default:
		  return state;
	}
}

export function loading ( state = {}, action ) {
	switch( action.type ) {
		case TOGGLE_LOADING:
		  return Object.assign( {}, state.loading, { isLoading: !state.isLoading } );
		default:
		 return state;
	}
}

export function suggestions ( state = [], action ) {
	switch( action.type ) {
		case LOAD_SUGGESTIONS:
		  return state.concat( action.suggestions );
		case RESET_SUGGESTIONS:
		  return state = [];
		default: 
		  return state;
	}
}  

