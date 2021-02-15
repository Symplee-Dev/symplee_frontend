import { SET_LOGGED_IN, SET_USER_ID } from '../actions/index';
const initialState = {
	authenticated: false,
	token: '',
	userId: undefined
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGGED_IN: {
			return { ...state, authenticated: true, token: action.payload };
		}
		case SET_USER_ID: {
			return { ...state, userId: action.payload.userId };
		}
		default:
			return state;
	}
};
