import { UserState } from '../types/state-types';
import { UserActionConstants } from '../types/action-types';

export const initialUserState: UserState = {
	authenticated: false,
	token: '',
	userId: undefined,
	user: undefined
};

export const userReducer = (
	state: UserState = initialUserState,
	action: { type: string; payload: any }
): UserState => {
	switch (action.type) {
		case UserActionConstants.SET_LOGGED_IN: {
			return { ...state, authenticated: true, token: action.payload };
		}
		case UserActionConstants.SET_USER_ID: {
			return { ...state, authenticated: true, userId: action.payload };
		}
		case UserActionConstants.SET_LOGGED_OUT: {
			return { ...initialUserState };
		}
		case UserActionConstants.SET_USER: {
			return {
				...state,
				userId: action.payload.id,
				user: action.payload
			};
		}
		default:
			return state;
	}
};
