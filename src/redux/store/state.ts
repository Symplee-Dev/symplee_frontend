import { RootState } from '../types/state-types';
import { initialUserState } from '../reducers/userReducer';

export const initialState: RootState = {
	user: initialUserState
};
