import { useDispatch } from 'react-redux';

export const ADD_USER = 'ADD_USER';
export const FETCH_USER = 'FETCH_USER';
export const EDIT_USER = 'EDIT_USER';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const addUser = (state, action) => {
	return {
		type: ADD_USER,
		payload: action.payload
	};
};

export const fetchUser = (state, action) => {
	return {
		type: FETCH_USER,
		payload: action.payload
	};
};

export const editUser = (state, action) => {
	return {
		type: EDIT_USER,
		payload: action.payload
	};
};

export const useLogin = () => {
	const dispatch = useDispatch();
	return (token: string) => {
		const action = {
			type: SET_LOGGED_IN,
			payload: token
		};

		dispatch(action);
	};
};
