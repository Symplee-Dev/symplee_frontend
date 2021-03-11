import { UserState, UIState, Notification } from './state-types';
import { ChangeLog } from '../../graphql';

export type RootSelectors = {
	user: {
		useSelectAuth: () => UserState['authenticated'];
		useSelectUserId: () => UserState['userId'];
	};
	ui: {
		useSelectNotifications?: () => UIState['notifications'];
		useSelectNotification?: (notificationId: number) => Notification;
		useSelectChangeLogs?: () => UIState['changelogs'];
		useSelectHasLatestChangeLog: () => UIState['hasLatestChangeLog'];
		useSelectChangeLog?: (id: number) => ChangeLog | undefined;
		useSelectCurrentChatGroup: () => UIState['currentChatGroup'];
		useSelectCurrentChat: () => UIState['currentChat'];
		useSelectCurrentProfile: () => UIState['currentlyViewedProfile'];
	};
};
