import { useDispatch, useSelector } from 'react-redux';
import {
	ClearNotification,
	ClearNotifications,
	SetChangeLogs
} from '../types/action-types';
import { RootState } from '../types/state-types';
import { SetHasLatestChangelog, SetUser } from '../types/action-types';
import { useUserLazyQuery, useUserQuery } from '../../graphql';
import { useEffect, useMemo, useState } from 'react';
import { logger } from '../../utils/logger';
import decode from 'jwt-decode';
import { UserSelectors } from '../selectors';
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
import { useLazyQuery } from '@apollo/client';

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
	},
	useGetUser() {
		const hasUser = useSelector((state: RootState) => state.user.user);

		const dispatch = useDispatch();

		const userReduxId = UserSelectors.useSelectUserId();

		const [
			fetchUser,
			{ data, loading, error, refetch }
		] = useUserLazyQuery();

		useEffect(() => {
			if (!data && !error && userReduxId) {
				fetchUser({ variables: { id: userReduxId } });
			}

			if (!loading && !hasUser) {
				if (error && refetch) {
					logger.error(error.message);
					refetch({ id: userReduxId });
				}

				if (data && !error) {
					const action: SetUser = {
						type: UserActionConstants.SET_USER,
						payload: data.user
					};

					dispatch(action);
				}
			}
		}, [
			error,
			loading,
			refetch,
			data,
			dispatch,
			hasUser,
			userReduxId,
			fetchUser
		]);
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
	}
};
