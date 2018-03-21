import logger from './logger.js';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export applyMiddleware( thunk, logger )
