/* Shared action creators */
const { getInitialData } = require( '../utils/API.js' ),
	{ receivePosts } = require( './posts.js' );


const handleInitialData = () => {
  return ( dispatch ) => {
	  
    return getInitialData()
      .then(( data ) => {
		  dispatch( receivePost( data ) );
	  })
	  .catch(( err ) => {
		 console.err( err ); 
	  });
  };
};

const addPost = ( post ) => {
	return {
		type: 'ADD_POST',
		post
	};
}

module.exports = addPost;