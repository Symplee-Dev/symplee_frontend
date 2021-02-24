import { RootState } from '../types/state-types';
import { initialUserState } from '../reducers/userReducer';
import { initialUIState } from '../reducers/uiReducer';

export const initialState: RootState = {
	user: initialUserState,
	ui: initialUIState
};
