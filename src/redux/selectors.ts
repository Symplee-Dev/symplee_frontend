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

export const UISelectors: RootSelectors['ui'] = {
	useSelectChangeLog(id) {
		const logs = useSelector((state: RootState) => state.ui.changelogs);

		return logs.find(log => log.id === id);
	},
	useSelectHasLatestChangeLog() {
		const hasLatest = useSelector(
			(state: RootState) => state.ui.hasLatestChangeLog
		);

		return hasLatest;
	}
};
