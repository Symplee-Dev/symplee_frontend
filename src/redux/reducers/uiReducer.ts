import { UIState } from '../types/state-types';
import { UIActionConstants } from '../types/action-types';

export const initialUIState: UIState = {
	notifications: [],
	hasLatestChangeLog: { value: false, dateSet: new Date().toString() },
	changelogs: [],
	currentChatGroup: undefined,
	currentChat: undefined
};

export const uiReducer = (
	state: UIState = initialUIState,
	action: { type: string; payload: any }
): UIState => {
	switch (action.type) {
		case UIActionConstants.CLEAR_NOTIFICATIONS: {
			return { ...state, notifications: [] };
		}
		case UIActionConstants.ADD_NOTIFICATION: {
			return {
				...state,
				notifications: [...state.notifications, action.payload]
			};
		}
		case UIActionConstants.CLEAR_NOTIFICATION: {
			return { ...state, notifications: action.payload };
		}
		case UIActionConstants.SET_CHANGELOGS: {
			return { ...state, changelogs: action.payload };
		}
		case UIActionConstants.SET_HAS_LATEST_CHANGELOG: {
			return { ...state, hasLatestChangeLog: action.payload };
		}
		case UIActionConstants.SET_CURRENT_CHATGROUP: {
			return { ...state, currentChatGroup: action.payload };
		}
		case UIActionConstants.CLEAR_CURRENT_CHAT: {
			return { ...state, currentChat: undefined };
		}
		case UIActionConstants.SET_CURRENT_CHAT: {
			return { ...state, currentChat: action.payload };
		}
		default:
			return state;
	}
};
