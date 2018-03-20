/* Searchbar component:
   Allows for typeahead searches of post keywords.
*/

import React from 'react';
import { connect } from 'react-redux';
import { findMatch } from '../utils/API.js';
import { Link } from 'react-router-dom';


const LOAD_SUGGESTIONS = 'LOAD_SUGGESTIONS',
      RESET_SUGGESTIONS = 'RESET_SUGGESTIONS';

function loadSuggestions( suggestions ) {
	return {
		type: LOAD_SUGGESTIONS,
		suggestions
	};
}

function resetSuggestions() {
	return {
		type: RESET_SUGGESTIONS
	}
}


function Suggestions ( props ) {
	
	return (
	  <ul className='searchbar-suggestions'>
	  { props.items.map( item => {
		 return (
           <li key={ item.id }
		     className='searchbar-suggestion'>
			 <Link to={ `/${ item.id }` }>
			   { item.title }
			 </Link>
		   </li>
         );		 
	  })}
	  </ul>
	);
}

class Searchbar extends React.Component {
  constructor( props ) {
	  super( props );
	  
	  this.handleChange = this.handleChange.bind( this );
	  this.toggleSearch = this.toggleSearch.bind( this );
  }
  
  toggleSearch() {
	  this.props.el.classList.toggle( 'active' );
	  
	  this.input.value = '';
	  this.props.dispatch( resetSuggestions() );
  }
  
  handleChange() {
	  const value = this.input.value;
	  
	  if( value === '' ) {
		  return this.props.dispatch( resetSuggestions() );
	  }
	  
	  const matches = findMatch( value, this.props.posts );
	  console.log( matches );
	  // Dispatch an action to create a suggestions property
	  // in the state
	  this.props.dispatch( resetSuggestions() );
	  this.props.dispatch( loadSuggestions( matches ) );
  }
	
  render() {
	  
    return (
	<div className='searchbar'>
	
	  <div className='searchbar-tab'
	    onClick={ this.toggleSearch } >
	    Search
	  </div>
	
	  <div className='searchbar-search'>
	    <input type='text' 
		  ref={( input ) => this.input = input }
		  onChange={ this.handleChange }
		  placeholder='Search post keywords' />
		
		{/* Pass in the state.suggestions property to the Suggestions
		component so that we can map over it */}
		<Suggestions items={ this.props.suggestions } 
			{...this.props} 
			toggle={ this.toggleSearch } />
		
	  </div>
	
	  
	</div>
	);
  }
}

export default connect(({ posts, suggestions }) => ({
  posts,
  suggestions
}))( Searchbar );