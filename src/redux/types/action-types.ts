import { UserState } from './state-types';

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

export type RootActions = {
	user: {
		useLogin(): (token: string) => void;
		useLogout(): () => void;
		useSetUserId(): (id: number) => void;
	};
};
