import { User, ChangeLog } from '../../graphql';

export type UserState = {
	authenticated: boolean;
	token: string;
	userId: number | undefined;
	user: User | undefined;
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
