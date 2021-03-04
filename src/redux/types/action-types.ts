import { UserState, Notification, UIState } from './state-types';
import { ChangeLog } from '../../graphql';

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
	ADD_NOTIFICATION = 'ADD_NOTIFICATION',
	SET_CHANGELOGS = 'SET_CHANGELOGS',
	SET_HAS_LATEST_CHANGELOG = 'SET_HAS_LATEST_CHANGELOG',
	SET_CURRENT_CHATGROUP = 'SET_CURRENT_CHATGROUP',
	SET_CURRENT_CHAT = 'SET_CURRENT_CHAT',
	CLEAR_CURRENT_CHAT = 'CLEAR_CURRENT_CHAT'
}

export interface SetHasLatestChangelog {
	type: UIActionConstants.SET_HAS_LATEST_CHANGELOG;
	payload: { value: boolean; dateSet: string };
}

export interface SetChangeLogs {
	type: UIActionConstants.SET_CHANGELOGS;
	payload: ChangeLog[];
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

export interface SetCurrentChatGroup {
	type: UIActionConstants.SET_CURRENT_CHATGROUP;
	payload: UIState['currentChatGroup'];
}

export interface SetCurrentChat {
	type: UIActionConstants.SET_CURRENT_CHAT;
	payload: UIState['currentChat'];
}

export interface ClearCurrentChat {
	type: UIActionConstants.CLEAR_CURRENT_CHAT;
}

export type RootActions = {
	user: {
		useLogin(): (token: string) => void;
		useLogout(): () => void;
		useSetUserId(): (id: number) => void;
		useGetUser(): void;
	};
	ui: {
		useClearNotifications(): () => void;
		useClearNotification(): (notificationId: number) => void;
		useAddNotification(): (params: Notification) => void;
		useSetChangeLogs(): (changelog: ChangeLog[]) => void;
		useSetHasLatestChangeLog(): ({ value: boolean }) => void;
		useSetCurrentChatGroup(): (group: UIState['currentChatGroup']) => void;
		useClearCurrentChatGroup(): () => void;
		useSetCurrentChat(): (chat: UIState['currentChat']) => void;
		useClearCurrentChat(): () => void;
	};
};
