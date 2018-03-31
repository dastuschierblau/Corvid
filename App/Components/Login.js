import React from 'react';
import { connect } from 'react-redux';
import { login, handleReceivePosts } from '../Actions/shared.js';

class Login extends React.Component {
  constructor( props ) {
    super( props );
	this.state = {
	  username: ''
	}
	
	this.handleSubmit = this.handleSubmit.bind( this );
	this.handleChange = this.handleChange.bind( this );
  }
  
  handleChange( e ) {
	  const value = ( e.target ).value;
	  this.setState(() => ({
		  username: value,
	  }));
  }
  
  handleSubmit( e ) {
    e.preventDefault();
	const { username } = this.state;
	this.setState(() => ({
		username: ''
	}));
	
	this.props.dispatch( login( username ) );
	this.props.dispatch( handleReceivePosts() );
  }

  render() {
	const { user } = this.props;
	  
    return (
	  <div className={ user ? 'login disabled' : 'login' }>
	  <form className='login-form' onSubmit={ this.handleSubmit } >
	    <input type='text' 
		onChange={ this.handleChange }
		
		value={ this.state.username }
		placeholder='Enter username' />
	  </form>
	  </div>
	);
  }
}

function mapStateToProps({ userAuth }) {
	return {
		user: userAuth.user
	};
}

export default connect( mapStateToProps )( Login );