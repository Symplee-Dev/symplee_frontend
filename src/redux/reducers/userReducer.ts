import { SET_LOGGED_IN } from '../actions/index';
const initialState = {
	authenticated: false,
	token: ''
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGGED_IN: {
			return { ...state, authenticated: true, token: action.payload };
		}
		default:
			return state;
	}
};
