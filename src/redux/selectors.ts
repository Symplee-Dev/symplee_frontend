import { useSelector } from 'react-redux';
import { Rstate } from '../types';

export const useSelectAuth = () => {
	const auth = useSelector((state: Rstate) => state.user.authenticated);

	return auth;
};
