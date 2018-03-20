import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import Post from './Post.js';
import AddPost from './AddPost.js';
import Searchbar from './Searchbar.js';
	  
import { getInitialData } from '../utils/API.js';

import { _getPosts } from '../utils/mockData.js';
	  //addPost = require( '../Actions/shared.js' );
	  
const ADD_POST = 'ADD_POST',
      REMOVE_POST = 'REMOVE_POST',
	  RECEIVE_POSTS = 'RECEIVE_POSTS',
	  TOGGLE_LOADING = 'TOGGLE_LOADING',
	  USER_LOGIN = 'USER_LOGIN';
	  
function login ( user ) {
	return {
		type: USER_LOGIN,
		username: user
	};
}

function toggleLoading () {
	return {
		type: TOGGLE_LOADING,
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
		dispatch( toggleLoading() );
		_getPosts()
		  .then( posts => {
			 dispatch( toggleLoading() );
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
		const { isLoading } = this.props.loading;
		const searchbar = document.querySelector( '.searchbar' )
			
		return (
		  <div className='container'>
		  
		  { !isLoading &&
		    <Searchbar el={ searchbar } {...this.props}/>
		  }
		  
		    <section className='sidebar'>
			
			{ user && 
			  <Link to='/'>
			  <h2>Welcome, { user }!</h2> 
			  </Link>
			}
			
			<ul className='sidebar-ul'>
			
			{ isLoading && <h3 className='sidebar-item'>Loading...</h3> }
			
		  { !isLoading && posts.map( item => {
			 return <Link to={ `/${item.id}` }
				 key={ item.id }>
			   <li
			     className='sidebar-item'>
				  { item.title }
               </li>
            </Link>			   
		  })}
		  
		  <Link to='/addPost'>
		    <li className='addPost'>
		      Add Post
		    </li>
		  </Link>
		  
		    </ul>
			
		</section>
			
			<Switch>
			
			  <Route exact path='/' render={() => {
				 return (
				  <div className='post'>
				    <h1>Welcome</h1>
				  </div>
				 );
			  }} />
			  
			  <Route path='/addPost' component={ AddPost } />
			  
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
		login: state.userAuth,
		loading: state.loading
	};
}

const ConnectedApp = connect( mapStateToProps )( App );
	  
export default ConnectedApp;