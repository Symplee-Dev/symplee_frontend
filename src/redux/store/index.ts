import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';
import { allReducers } from '../reducers';

export const store = createStore(allReducers, applyMiddleware(Thunk));
