const logger = require( './logger.js' );
const thunk = require( 'redux-thunk' );
const { applyMiddleware } = require( 'redux' );

module.exports = {
	middleware: applyMiddleware( thunk, logger )
};