import { useDispatch, useSelector } from 'react-redux';
import {
	ClearCurrentChat,
	ClearNotification,
	ClearNotifications,
	SetChangeLogs
} from '../types/action-types';
import { RootState, UIState } from '../types/state-types';
import {
	SetHasLatestChangelog,
	SetUser,
	SetCurrentChatGroup
} from '../types/action-types';
import {
	useUserQuery,
	useUserLazyQuery,
	useToggleUserOnlineMutation
} from '../../graphql';
import { logger } from '../../utils/logger';
import decode from 'jwt-decode';
import {
	SetCurrentChat,
	RefetchedUser,
	SetCurrentProfileView
} from '../types/action-types';
import { useEffect } from 'react';
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
		const [toggleOnline] = useToggleUserOnlineMutation();
		return () => {
			toggleOnline();
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
	},
	useGetUser() {
		// const hasUser = useSelector((state: RootState) => state.user.user);

		const dispatch = useDispatch();

		const token = useSelector((state: RootState) => state.user.token);

		const userReduxId: { userId: number } = decode(token);

		const { refetch } = useUserQuery({
			variables: { id: userReduxId.userId },
			onCompleted: data => {
				const action: SetUser = {
					type: UserActionConstants.SET_USER,
					payload: data.user
				};

				dispatch(action);
			},
			onError: error => {
				logger.error(error.message);
				refetch({ id: userReduxId.userId });
			}
		});
	},
	useRefetchUser() {
		const dispatch = useDispatch();

		const token = useSelector((state: RootState) => state.user.token);

		const userReduxId: { userId: number } = decode(token);

		const [fetch, { data, error }] = useUserLazyQuery({
			fetchPolicy: 'network-only'
		});

		useEffect(() => {
			if (data && !error) {
				const action: RefetchedUser = {
					type: UserActionConstants.REFETCHED_USER,
					payload: data.user
				};

				dispatch(action);
				console.log('Completed');
			}
		}, [data, error, dispatch]);

		return () => {
			fetch({
				variables: { id: userReduxId.userId }
			});
		};
	}
};

export const UIActions: RootActions['ui'] = {
	useSetCurrentChat() {
		const dispatch = useDispatch();

		return (chat: UIState['currentChat']) => {
			const action: SetCurrentChat = {
				type: UIActionConstants.SET_CURRENT_CHAT,
				payload: chat
			};

			dispatch(action);
		};
	},
	useClearCurrentChat() {
		const dispatch = useDispatch();

		return () => {
			const action: ClearCurrentChat = {
				type: UIActionConstants.CLEAR_CURRENT_CHAT
			};

			dispatch(action);
		};
	},
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
	},
	useSetChangeLogs() {
		const dispatch = useDispatch();

		return changelogs => {
			const action: SetChangeLogs = {
				type: UIActionConstants.SET_CHANGELOGS,
				payload: changelogs
			};

			dispatch(action);
		};
	},
	useSetHasLatestChangeLog() {
		const dispatch = useDispatch();

		return val => {
			const action: SetHasLatestChangelog = {
				type: UIActionConstants.SET_HAS_LATEST_CHANGELOG,
				payload: { value: val.value, dateSet: new Date().toString() }
			};

			dispatch(action);
		};
	},
	useClearCurrentChatGroup() {
		const dispatch = useDispatch();

		return () => {
			const action: SetCurrentChatGroup = {
				type: UIActionConstants.SET_CURRENT_CHATGROUP,
				payload: undefined
			};

			dispatch(action);
		};
	},
	useSetCurrentChatGroup() {
		const dispatch = useDispatch();

		return chatGroup => {
			const action: SetCurrentChatGroup = {
				type: UIActionConstants.SET_CURRENT_CHATGROUP,
				payload: chatGroup
			};

			dispatch(action);
		};
	},
	useSetCurrentProfile() {
		const dispatch = useDispatch();

		return profile => {
			const action: SetCurrentProfileView = {
				type: UIActionConstants.SET_CURRENT_PROFILE_VIEW,
				payload: profile
			};

			dispatch(action);
		};
	}
};
