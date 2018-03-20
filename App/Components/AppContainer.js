/* AppContainer component */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.js';
	  //posts = require( '../Reducers/index.js' ),
	  //middleware = require( '../Middleware/index.js' ),
import { createStore, applyMiddleware, combineReducers } from'redux';
	
	
/* Reducers */
const RECEIVE_POSTS = 'RECEIVE_POSTS',
      ADD_POST = 'ADD_POST',
	  TOGGLE_POST = 'SET_POST',
	  TOGGLE_LOADING = 'TOGGLE_LOADING',
	  REMOVE_POST = 'REMOVE_POST',
	  USER_LOGIN = 'USER_LOGIN';
	
function posts ( state = [], action ) {
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
function userAuth ( state = {}, action ) {
	switch( action.type ) {
		case USER_LOGIN:
		  return Object.assign( {}, state.userAuth, { user: action.username, logged: true } );
		default:
		  return state;
	}
}

function loading ( state = {}, action ) {
	switch( action.type ) {
		case TOGGLE_LOADING:
		  return Object.assign( {}, state.loading, { isLoading: !state.isLoading } );
		default:
		 return state;
	}
}

/* Logger middleware */
const logger = ( store ) => ( next ) => ( action ) => {
	console.group( action.type );
	console.log( 'The action: ', action );
	const result = next( action );
	console.log( 'The new state: ', store.getState() );
	console.groupEnd();
	
	return result;
};
	  
/* Create store */
const store = createStore( combineReducers({ posts, userAuth, loading }), applyMiddleware( logger, thunk ) );
	  

class AppContainer extends React.Component {
  render() {
    return (
	  <Provider store={ store } >
	    <Router>
		<Route render={( props ) => (
	      <App {...props} />
		)} />
		</Router>
	  </Provider>
	);
  }
}

export default AppContainer;