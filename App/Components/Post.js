const React = require( 'react' ),
      { Redirect } = require( 'react-router-dom' ),
      { connect } = require( 'react-redux' );
	  
/* Util function implementing newlines found inside of strings. */
function enableNewlines( str ) {
	return str.split( '\n' )
	   .map( ( item, index ) => <p key={ index }>{ item }</p>);
}

/* Relevant action creators */
const TOGGLE_POST = 'TOGGLE_POST',
      RESET_SUGGESTIONS = 'RESET_SUGGESTIONS';
	  
function setCurrentPost( post ) {
	return {
		type: TOGGLE_POST,
		post
	};
}

function resetSuggestions() {
	return {
		type: RESET_SUGGESTIONS
	}
}
	  
class Post extends React.Component {
  constructor( props ) {
	  super( props );
	  this.state = {
		currentPost: null  
	  };
  }
	
  componentDidMount() {
	  const { id } = this.props.match.params;
		
	  this.props.dispatch( resetSuggestions() );
	
	  this.setState(() => ({
		  currentPost: id
	  }));

  }
  
  componentWillReceiveProps( nextProps ) {
	  const { id } = nextProps.match.params;
	  
	  if( nextProps.location.pathname !== this.props.location.pathname ) {
		  this.setState(() => ({
			  currentPost: id
		  }));
	  }
  }
	
  render() {
	const { posts } = this.props;

    return (
	  <div className='post-wrapper'>
	  <div className='post'>
	  
		{ posts.filter(({ id }) => id === this.state.currentPost )
		  .map( item => (
		  
		    <div key={ item.id }>
			
		      <h1>{item.title}</h1> 
			  { enableNewlines( item.content ) }
			  
			  <footer>
			  
			    <ul className='footer-left'>
			      <li>{ item.author }</li>
				  <li>{ item.timestamp }</li>
				</ul>
				
				<ul className='footer-right'>
				  <li>Edit</li>
				  <li>Remove</li>
				</ul>
				
			  </footer>
			  
		    </div>
			
		  ))
		}
		  
	  </div>
	  </div>
	);
  }
}

module.exports = connect(( state ) => ({
  posts: state.posts,
  suggestions: state.suggestions
}))( Post );