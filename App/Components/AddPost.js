/* AddPost component:
   Its purpose is to dispatch an addPost action using data 
   from form input fields.
*/

import React from 'react';
import { connect } from 'react-redux';
import { generateId, prepareTags } from '../utils/helpers.js';
import { addPost } from '../Actions/shared.js';


class AddPost extends React.Component {
  constructor( props ) {
	  super( props );
	  this.state = {
		title: null,
        content: null,
		tags: null,
		
        titleText: '',
        contentText: '',
        tagList: ''		
	  };
	  
	  this.handleChange = this.handleChange.bind( this );
	  this.handleSubmit = this.handleSubmit.bind( this );
  }
  
  componentDidMount() {
	  // Cache DOM elements for input and textarea fields
	  const title = document.querySelector( '#post-title' );
	  const content = document.querySelector( '.add-post-content' );
	  const tags = document.querySelector( '#post-tags' );
	  
	  this.setState(() => ({
		  title,
		  content,
		  tags
	  }));
  }
  
  handleChange( e ) {
	  const stateTarget = e.target;
	  const value = stateTarget.value;

	  
	  if( stateTarget.id === 'post-title' ) {
		  this.setState(() => ({
			  titleText: value
		  }));
	  } else if ( stateTarget.id === 'post-tags' ) {
		  this.setState(() => ({
			  tagList: value
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
	  let tags = this.state.tags.value;
	  
	  if( !title || !content || !tags ) {
		  alert( 'Please fill in all of the fields!' );
		  return;
	  }
	  
	  tags = prepareTags( tags );
	  
	  this.props.dispatch( addPost( { title, content, tags } ) );
	  
	  this.setState(() => ({
		  titleText: '',
		  contentText: '',
		  tagList: ''
	  }));
  }
	
  render() {
    return (
	  <div className='post-wrapper'>
	  <h2 className='post-wrapper-header'>Add Post</h2>
	  <div className='post'>
		
		<form className='add-post-form'>
		
		<span className='add-post-input-wrapper'>
		  <label 
		    className='add-post-title-label'
		    htmlFor='post-title'>
		    Title:
		  </label>
		
		  <input className='add-post-title' type='text'
            id='post-title'		  
		    onChange={ this.handleChange }
			value={ this.state.titleText }
			placeholder='Post title' autoFocus='true' />
		</span>
		
		
		  <textarea 
		    onChange={ this.handleChange }
			value={ this.state.contentText }
			className='add-post-content'/>
			
		  <span className='add-post-input-wrapper'>
		  <label 
		    className='add-post-title-label'
		    htmlFor='post-tags'>
		    Tags:
		  </label>
		
		  <input className='add-post-title' type='text'
            id='post-tags'		  
		    onChange={ this.handleChange }
			value={ this.state.tagList }
			placeholder='Enter tags seperated by commas' autoFocus='true' />
		  </span>
		
		  <button type='submit' className='add-post-submit'
		    onClick={ this.handleSubmit } >
		    Save Post
		  </button>
		  
		</form>
		
	  </div>
	  </div>
	);
  }
}

export default connect(( state ) => ({
	state
}))( AddPost );