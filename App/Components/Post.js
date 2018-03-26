const React = require( 'react' ),
      { Redirect } = require( 'react-router-dom' ),
	  { formatDate } = require( '../utils/helpers.js' ),
      { connect } = require( 'react-redux' );
	  
import { setCurrentPost, resetSuggestions } from '../Actions/shared.js';
	  
/* Util function implementing newlines found inside of strings. */
function enableNewlines( str ) {
	return str.split( '\n' )
	   .map( ( item, index ) => <p key={ index }>{ item }</p>);
}

	  
class Post extends React.Component {
	
  componentDidMount() {	
	  this.props.dispatch( resetSuggestions() );
  }
  
	
  render() {
	const { currentPost } = this.props;
	
	if( !currentPost ) {
		return <Redirect to='/' />;
	}

    return (
	  <div className='post-wrapper'>
	  <div className='post'>
	    
		    <div key>
			
		      <h1>{currentPost.title}</h1> 
			  { enableNewlines( currentPost.content ) }
			  
			  <ul className='tag-list'>
			  { currentPost.keywords.map( item => {
				  return <li key={item}>{ item }</li>
			  }) }
			  </ul>
			  
			  <footer>
			  
			    <ul className='footer-left'>
			      <li>{ currentPost.author }</li>
				  <li>{ formatDate( currentPost.timestamp ) }</li>
				</ul>
				
				<ul className='footer-right'>
				  <li>{/*Edit*/}</li>
				  <li>{/*Remove*/}</li>
				</ul>
				
			  </footer>
			  
		    </div>
		  
	  </div>
	  </div>
	);
  }
}

function mapStateToProps({ posts, suggestions }, { match }) {
	const { postId } = match.params;
	const post = posts.filter(({ id }) => {
		return id === postId;
	});
	
	if( !post ) {
		return {
		  currentPost: null
		};
	}
	
	return {
		currentPost: post[0],
		posts,
		suggestions
	};
}

module.exports = connect( mapStateToProps )( Post );