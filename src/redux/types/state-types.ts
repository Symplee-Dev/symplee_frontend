import { ChangeLog, Maybe } from '../../graphql';

type UserFromQuery = {
	username: string;
	name: string;
	id: number;
	email: string;
	key: string;
	createdAt: string;
	verified: boolean;
	avatar?: Maybe<string>;
	chatGroups: {
		name: string;
		id: number;
		avatar?: Maybe<string>;
	}[];
};

export type UserState = {
	authenticated: boolean;
	token: string;
	userId: number | undefined;
	user: UserFromQuery | undefined;
};

export type Notification = {
	id: number;
	title: string;
	autoDismiss?: boolean;
	autoTimeoutTime?: number;
	type: string;
};

export type UIState = {
	notifications: Notification[];
	hasLatestChangeLog: { value: boolean; dateSet: string };
	changelogs: ChangeLog[];
};

export interface RootState {
	user: UserState;
	ui: UIState;
}
