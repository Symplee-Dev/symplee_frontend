import { UserState, UIState, Notification } from './state-types';

export type RootSelectors = {
	user: {
		useSelectAuth: () => UserState['authenticated'];
		useSelectUserId: () => UserState['userId'];
	};
	ui: {
		useSelectNotifications: () => UIState['notifications'];
		useSelectNotification: (notificationId: number) => Notification;
	};
};
