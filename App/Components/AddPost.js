import React from 'react';
import { connect } from 'react-redux';
import { generateId } from '../utils/API.js';

const ADD_POST = 'ADD_POST';

function addPost ({ title, content }) {
	return {
		type: ADD_POST,
		post: {
			title,
			content,
			id: generateId(),
			current: false
		}
		
	};
}

class AddPost extends React.Component {
  constructor( props ) {
	  super( props );
	  this.state = {
		title: null,
        content: null,
		
        titleText: '',
        contentText: ''		
	  };
	  
	  this.handleChange = this.handleChange.bind( this );
	  this.handleSubmit = this.handleSubmit.bind( this );
  }
  
  componentDidMount() {
	  // Cache DOM elements for input and textarea fields
	  const title = document.querySelector( '.add-post-title' );
	  const content = document.querySelector( '.add-post-content' );
	  
	  this.setState(() => ({
		  title,
		  content
	  }));
  }
  
  handleChange( e ) {
	  const stateTarget = e.target;
	  const value = stateTarget.value;

	  
	  if( stateTarget.nodeName === 'INPUT' ) {
		  this.setState(() => ({
			  titleText: value
		  }));
	  } else {
		  this.setState(() => ({
			  contentText: value
		  }));
	  }
  }
  
  handleSubmit( event ) {
	  event.preventDefault();
	  const title = this.state.title.value;
	  const content = this.state.content.value;
	  
	  this.props.dispatch( addPost( { title, content } ) );
	  
	  this.setState(() => ({
		  titleText: '',
		  contentText: ''
	  }));
  }
	
  render() {
    return (
	  <div className='post'>
	    <h2>Add Post</h2>
		
		<form className='add-post-form'>
		
		  <input className='add-post-title' type='text' 
		    onChange={ this.handleChange }
			value={ this.state.titleText }
			placeholder='Post title' autoFocus='true' />
		
		  <textarea 
		    onChange={ this.handleChange }
			value={ this.state.contentText }
			className='add-post-content'/>
		
		  <button type='submit' className='add-post-submit'
		    onClick={ this.handleSubmit } >
		    Save Post
		  </button>
		  
		</form>
		
	  </div>
	);
  }
}

export default connect(( state ) => ({
	state
}))( AddPost );