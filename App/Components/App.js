import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import Post from './Post.js';
import AddPost from './AddPost.js';
import Searchbar from './Searchbar.js';
	  
import { login, logout, toggleLoading, addPost, removePost, receivePosts, emptyPosts, handleReceivePosts } from '../Actions/shared.js';
import { getInitialData } from '../utils/API.js';


	  
class App extends React.Component {
	constructor( props ) {
		super( props );
		
		this.login = this.login.bind( this );
		this.logout = this.logout.bind( this );
	}
	
	login() {
		this.props.dispatch( login( 'Emmett' ) );
	
        this.props.dispatch( handleReceivePosts() );
	}
	
	logout() {
		this.props.dispatch( emptyPosts() );
		this.props.dispatch( logout() );
		this.props.history.push( '/' );
	}
	
	componentDidMount() {
		
	}
	
	render() {
		const { posts, match } = this.props;
		const { user } = this.props.login;
		const { isLoading } = this.props.loading;
		const searchbar = document.querySelector( '.searchbar' )
			
		return (
		  <div className='container-wrapper'>
		  
		  <nav className='nav'>
		    { !user &&
			  <button className='login-btn' onClick={ this.login }>
			    Login
			  </button>
			}
			
			{ user &&
			  <button className='login-btn' onClick={ this.logout }>
			    Logout
			  </button>
			}
		  
		    <h1>CORVID</h1>
		  </nav>
		
		  <div className='container'>
		  
		  {/* Display the search tab feature only when user is logged in and initial posts are loaded */}
		  { user && !isLoading &&
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
		  
		  { user && !isLoading &&
		  <Link to='/addPost'>
		    <li className='addPost'>
		      Add Post
		    </li>
		  </Link>
		  }
		  
		    </ul>
			
		</section>
			
			<Switch>
			
			{ !user && <Route exact path='/' render={() => {
				return (
				  <h1 className='initial-greeting'>Please log in</h1>
				);
			  }} />
			}
			
			{ user && <Route exact path='/' render={() => {
				 return (
				   <div className='post-wrapper'>
				     <div className='post'>
					   <h1>Welcome</h1>
					 </div>
				   </div>
				 );
			  }} />
			}
			  
			  <Route path='/addPost' component={ AddPost } />
			  
			  <Route path='/:id' render={( props ) => {
			    return <Post {...props} />
			  }} />
			  
			  <Route render={() => <h1>404</h1> } />
			  
			</Switch>
			
		  </div>
		  
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