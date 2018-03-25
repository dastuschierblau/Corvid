import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
	const { posts, isLoading, user } = this.props;
	  
    return (
	
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
	  
	);
  }
}

function mapStateToProps({ posts, loading, userAuth }) {
  return {
	posts,
    isLoading: loading.isLoading,
    user: userAuth.user
  };
}

export default connect( mapStateToProps )( Sidebar );

