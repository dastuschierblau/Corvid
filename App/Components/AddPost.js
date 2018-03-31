/* AddPost component:
   Its purpose is to dispatch an addPost action using data 
   from form input fields.
*/

import React from 'react';
import { connect } from 'react-redux';
import { prepareTags } from '../utils/helpers.js';
import { addPost } from '../Actions/shared.js';


class AddPost extends React.Component {
  constructor( props ) {
	  super( props );
	  this.state = {
        title: '',
        content: '',
        tags: ''		
	  };
	  
	  this.handleChange = this.handleChange.bind( this );
	  this.handleSubmit = this.handleSubmit.bind( this );
  }
  
  handleChange( e ) {
	  const stateTarget = e.target;
	  const { value, name } = stateTarget;

	  this.setState(() => ({
		  [ name ]: value
	  }));
	 
  }
  
  handleSubmit( event ) {
	  event.preventDefault();
	  const { title, content } = this.state;
	  let { tags } = this.state;
	  const author = this.props.user;
	  
	  if( !title || !content || !tags ) {
		  alert( 'Please fill in all of the fields!' );
		  return;
	  }
	  
	  tags = prepareTags( tags );
	  
	  this.props.dispatch( addPost( { title, content, tags, author } ) );
	  
	  this.setState(() => ({
		  title: '',
		  content: '',
		  tags: ''
	  }));
  }
	
  render() {
	const { title, content, tags } = this.state;
	  
    return (
	  <div className='post-wrapper'>
	  <h2 className='post-wrapper-header'>Add Post</h2>
	  <div className='post'>
		
		<form className='add-post-form' onSubmit={ this.handleSubmit }>
		
		<span className='add-post-input-wrapper'>
		  <label 
		    className='add-post-title-label'
		    htmlFor='post-title'>
		    Title:
		  </label>
		
		  <input className='add-post-title' type='text'
            id='post-title'		  
			name='title'
		    onChange={ this.handleChange }
			value={ title }
			placeholder='Post title' autoFocus='true' />
		</span>
		
		
		  <textarea 
		    onChange={ this.handleChange }
			value={ content }
			name='content'
			className='add-post-content'/>
			
		  <span className='add-post-input-wrapper'>
		  <label 
		    className='add-post-title-label'
		    htmlFor='post-tags'>
		    Tags:
		  </label>
		
		  <input className='add-post-title' type='text'
            id='post-tags'		  
			name='tags'
		    onChange={ this.handleChange }
			value={ tags }
			placeholder='Enter tags seperated by commas' autoFocus='true' />
		  </span>
		
		  <button type='submit' className='add-post-submit'>
		    Save Post
		  </button>
		  
		</form>
		
	  </div>
	  </div>
	);
  }
}

export default connect(({ userAuth }) => ({
	user: userAuth.user
}))( AddPost );