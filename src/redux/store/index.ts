import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';
import { allReducers } from '../reducers';
import logger from 'redux-logger';
import { RootState } from '../types/state-types';

export const store = createStore<RootState, any, any, any>(
	allReducers,
	composeWithDevTools(applyMiddleware(Thunk, logger))
);
