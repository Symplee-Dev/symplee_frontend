import { useDispatch, useSelector } from 'react-redux';
import { ClearNotification, ClearNotifications } from '../types/action-types';
import { RootState } from '../types/state-types';
import {
	SetLoggedOut,
	SetUserId,
	AddNotification,
	UIActionConstants
} from '../types/action-types';
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

export const UIActions: RootActions['ui'] = {
	useAddNotification() {
		const dispatch = useDispatch();

		return notification => {
			const action: AddNotification = {
				type: UIActionConstants.ADD_NOTIFICATION,
				payload: notification
			};
			dispatch(action);
		};
	},
	useClearNotification() {
		const dispatch = useDispatch();

		const notifications = useSelector(
			(state: RootState) => state.ui.notifications
		);

		return notificationId => {
			const filtered = notifications.filter(
				notif => notif.id !== notificationId
			);

			const action: ClearNotification = {
				type: UIActionConstants.CLEAR_NOTIFICATION,
				payload: filtered
			};
			dispatch(action);
		};
	},
	useClearNotifications() {
		const dispatch = useDispatch();

		return () => {
			const action: ClearNotifications = {
				type: UIActionConstants.CLEAR_NOTIFICATIONS
			};
			dispatch(action);
		};
	}
};
