import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { uiReducer } from './uiReducer';

export const allReducers = combineReducers({
	user: userReducer,
	ui: uiReducer
});
