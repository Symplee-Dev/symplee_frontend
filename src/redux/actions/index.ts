import { useDispatch } from 'react-redux';
import { SetLoggedOut, SetUserId } from '../types/action-types';
import {
	RootActions,
	SetLoggedIn,
	UserActionConstants
} from '../types/action-types';

export const UserActions: RootActions['user'] = {
	useLogin() {
		const dispatch = useDispatch();

		return token => {
			const action: SetLoggedIn = {
				type: UserActionConstants.SET_LOGGED_IN,
				payload: token
			};

			dispatch(action);
		};
	},
	useLogout() {
		const dispatch = useDispatch();

		return () => {
			localStorage.removeItem('bolttoken');

			const action: SetLoggedOut = {
				type: UserActionConstants.SET_LOGGED_OUT
			};

			dispatch(action);
		};
	},
	useSetUserId() {
		const dispatch = useDispatch();

		return userId => {
			const action: SetUserId = {
				type: UserActionConstants.SET_USER_ID,
				payload: userId
			};

			dispatch(action);
		};
	}
};
