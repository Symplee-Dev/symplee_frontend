import { User } from '../../graphql';

export type UserState = {
	authenticated: boolean;
	token: string;
	userId: number | undefined;
	user: User | undefined;
};

export interface RootState {
	user: UserState;
}
