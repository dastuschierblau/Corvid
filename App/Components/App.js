import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import Post from './Post.js';
	  
import { getInitialData } from '../utils/API';

import { _getPosts } from '../utils/mockData.js';
	  //addPost = require( '../Actions/shared.js' );
	  
const ADD_POST = 'ADD_POST',
      REMOVE_POST = 'REMOVE_POST',
	  RECEIVE_POSTS = 'RECEIVE_POSTS',
	  USER_LOGIN = 'USER_LOGIN';
	  
function login ( user ) {
	return {
		type: USER_LOGIN,
		username: user
	};
}
	  
function addPost ( post ) {
	return {
		type: ADD_POST,
		current: false,
		post
	};
}

function removePost ( id ) {
	return {
		type: REMOVE_POST,
		id
	};
}

function receivePosts ( posts ) {
	return {
		type: RECEIVE_POSTS,
		posts
	};
}

function handleReceivePosts() {
	return ( dispatch ) => {
		_getPosts()
		  .then( posts => {
			 dispatch( receivePosts( posts ) ); 
		  })
		  .catch(( err ) => console.err( err ) );
	};
}
	  
class App extends React.Component {
	componentDidMount() {
		this.props.dispatch( login( 'Emmett' ) );
	
        this.props.dispatch( handleReceivePosts() );
		
	}
	
	render() {
		const { posts, match } = this.props;
		const { user } = this.props.login;
			
		return (
		  <div>
		    <ul className='sidebar'>
			
			{ user && 
			  <Link to='/'>
			  <h2>Welcome, { user }!</h2> 
			  </Link>
			}
			
		  { posts.map( item => {
			 return <Link to={ `/${item.id}` }
				 key={ item.id }>
			   <li
			     className='sidebar-item'>
				  { item.title }
               </li>
            </Link>			   
		  })}
		    </ul>
			
			<Switch>
			  <Route exact path='/' render={() => {
				 return (
				  <div className='post'>
				    <h1>Welcome</h1>
				  </div>
				 );
			  }} />
			  <Route path='/:id' render={( props ) => {
			    return <Post {...props} />
			  }} />
			  <Route render={() => <h1>404</h1> } />
			</Switch>
			
		  </div>
		);
	}
}

function mapStateToProps ( state ) {
	return {
		posts: state.posts,
		login: state.userAuth
	};
}

const ConnectedApp = connect( mapStateToProps )( App );
	  
export default ConnectedApp;