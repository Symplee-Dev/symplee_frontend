import { UserState, Notification } from './state-types';

export enum UserActionConstants {
	SET_LOGGED_IN = 'SET_LOGGED_IN',
	SET_USER_ID = 'SET_USER_ID',
	SET_LOGGED_OUT = 'SET_LOGGED_OUT',
	SET_USER = 'SET_USER'
}

export interface SetLoggedIn {
	type: UserActionConstants.SET_LOGGED_IN;
	payload: UserState['token'];
}

export interface SetUserId {
	type: UserActionConstants.SET_USER_ID;
	payload: UserState['userId'];
}

export interface SetLoggedOut {
	type: UserActionConstants.SET_LOGGED_OUT;
}

export interface SetUser {
	type: UserActionConstants.SET_USER;
	payload: UserState['user'];
}

export enum UIActionConstants {
	CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION',
	CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS',
	ADD_NOTIFICATION = 'ADD_NOTIFICATION'
}

export interface ClearNotifications {
	type: UIActionConstants.CLEAR_NOTIFICATIONS;
}

export interface ClearNotification {
	type: UIActionConstants.CLEAR_NOTIFICATION;
	payload: Notification[];
}

export interface AddNotification {
	type: UIActionConstants.ADD_NOTIFICATION;
	payload: Notification;
}

export type RootActions = {
	user: {
		useLogin(): (token: string) => void;
		useLogout(): () => void;
		useSetUserId(): (id: number) => void;
	};
	ui: {
		useClearNotifications(): () => void;
		useClearNotification(): (notificationId: number) => void;
		useAddNotification(): (params: Notification) => void;
	};
};
