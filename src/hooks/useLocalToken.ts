import { useEffect } from 'react';
import { UserActions } from '../redux/actions/index';
import { UserSelectors } from '../redux/selectors';
import decode from 'jwt-decode';

export interface DecodedToken {
	userId: number;
	username: string;
}

export const useLocalToken = () => {
	const setUserId = UserActions.useSetUserId();
	const authenticated = UserSelectors.useSelectAuth();

	useEffect(() => {
		if (authenticated !== undefined && authenticated === false) {
			const token = localStorage.getItem('bolttoken');

			if (token && token.length > 0) {
				const user: DecodedToken = decode(token ?? '');

				if (user.userId !== undefined) {
					setUserId(user.userId);
				}
			}
		}
	}, [authenticated, setUserId]);

	return authenticated;
};
