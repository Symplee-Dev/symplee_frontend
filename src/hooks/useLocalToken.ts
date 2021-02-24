import { useEffect } from 'react';
import { UserActions } from '../redux/actions/index';
import { UserSelectors } from '../redux/selectors';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { UserActionConstants } from '../redux/types/action-types';

export interface DecodedToken {
	userId: number;
	username: string;
}

export const useLocalToken = () => {
	const setUserId = UserActions.useSetUserId();
	const dispatch = useDispatch();
	const authenticated = UserSelectors.useSelectAuth();

	useEffect(() => {
		if (authenticated !== undefined && authenticated === false) {
			const token = localStorage.getItem('bolttoken');

			if (token && token.length > 0) {
				const user: DecodedToken = decode(token ?? '');

				if (user.userId !== undefined) {
					setUserId(user.userId);
					dispatch({
						type: UserActionConstants.SET_LOGGED_IN,
						payload: token
					});
				}
			}
		}
	}, [authenticated, setUserId]);

	return authenticated;
};
