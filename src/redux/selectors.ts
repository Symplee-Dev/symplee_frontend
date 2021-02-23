import { useSelector } from 'react-redux';
import { RootState } from './types/state-types';
import { RootSelectors } from './types/selector-types';

export const UserSelectors: RootSelectors['user'] = {
	useSelectAuth: () => {
		const authenticated = useSelector(
			(state: RootState) => state.user.authenticated
		);
		return authenticated;
	},
	useSelectUserId: () => {
		const userId = useSelector((state: RootState) => state.user.userId);

		return userId;
	}
};
