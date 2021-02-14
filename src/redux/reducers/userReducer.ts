import { bindActionCreators } from 'redux';

const initialState = {
	isLoggedIn: false
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
