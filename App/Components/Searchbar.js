/* Searchbar component:
   Allows for typeahead searches of post keywords.
*/

import React from 'react';
import { connect } from 'react-redux';

function Suggestions ( props ) {
	
	return (
	  <ul className='searchbar-suggestions'>
	   <li>Test</li>
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
  }
  
  handleChange() {
	  const value = this.input.value;
	  
	  this.props.sort( value );
	  // Dispatch an action to create a suggestions property
	  // in the state
  }
	
  render() {
	  
    return (
	<div className='searchbar'>
	
	  <div className='searchbar-search'>
	    <input type='text' 
		  ref={( input ) => this.input = input }
		  onChange={ this.handleChange }
		  placeholder='Search post keywords' />
		
		{/* Pass in the state.suggestions property to the Suggestions
		component so that we can map over it */}
		<Suggestions />
		
	  </div>
	
	  <div className='searchbar-tab'
	    onClick={ this.toggleSearch } >
	    Searchbar
	  </div>
	  
	</div>
	);
  }
}

export default connect(( state ) => state )( Searchbar );