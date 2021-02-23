import { User } from '../../graphql';

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
};

export interface RootState {
	user: UserState;
	ui: UIState;
}
