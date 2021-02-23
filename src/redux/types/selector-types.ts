import { UserState } from './state-types';

export type RootSelectors = {
	user: {
		useSelectAuth: () => UserState['authenticated'];
		useSelectUserId: () => UserState['userId'];
	};
};
