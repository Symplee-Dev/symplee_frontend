import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import { allReducers } from '../reducers';
import logger from 'redux-logger';

export const store = createStore(
	allReducers,
	composeWithDevTools(applyMiddleware(Thunk, logger))
);
