/* Homepage Component */
import React from 'react';

class Homepage extends React.Component {
  render() {
    return (
	  <div className='post-wrapper'>
		<div className='post'>
		  <h1>Welcome to Corvid</h1>
		  <p>
		    Found a cool new API that you're not quite confident you'll remember when you need it? Stumble across a neat functional programming technique that you may want to implement in the future? Write up your own summary of the information you need and post it to Corvid.
		  </p>
		  <p>
		    Organize your notes and guides all in one place. Tagging your posts with relevant search terms will allow you to easily reference them later. 
		  </p>
	    </div>
	  </div>
	);
  }
}

export default Homepage;