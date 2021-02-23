import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserActions, UIActions } from '../redux/actions/index';
import { Maybe, LoginMutation, Exact } from '../graphql';
import { ApolloError, MutationFunctionOptions } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';

export type UsernameType = 'USERNAME' | 'EMAIL';

export type LoginCredentials = {
	username: string;
	password: string;
	key: string;
};

export const onLoginSubmit = (
	e: FormEvent,
	usernameType: UsernameType,
	loginCredentials: LoginCredentials,
	login: (
		options?:
			| MutationFunctionOptions<
					LoginMutation,
					Exact<{
						username?: Maybe<string>;
						email?: Maybe<string>;
						password: string;
					}>
			  >
			| undefined
	) => void
) => {
	e.preventDefault();

	if (usernameType === 'USERNAME') {
		login({
			variables: {
				username:
					loginCredentials.username + '#' + loginCredentials.key,
				password: loginCredentials.password
			}
		});
	} else {
		login({
			variables: {
				email: loginCredentials.username,
				password: loginCredentials.password
			}
		});
	}
};

export const useLogin = (
	loading: boolean,
	error: ApolloError | undefined,
	data: LoginMutation | null | undefined
) => {
	const [errorState, setErrorState] = useState('');

	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		username: '',
		password: '',
		key: ''
	});

	const [usernameType, setUsernameType] = useState<UsernameType>('EMAIL');

	const setAuth = UserActions.useLogin();

	const history = useHistory();

	const addNotication = UIActions.useAddNotification();

	const id = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	useEffect(() => {
		if (!loading) {
			if (error) {
				if (errorState !== error.message) {
					setErrorState(error.message);
					addNotication({
						title: error.message,
						id,
						type: 'error',
						autoDismiss: true,
						autoTimeoutTime: 3000
					});
				}
			}

			if (
				!error &&
				data &&
				data.login &&
				errorState !== 'Logging you In!'
			) {
				setErrorState('Logging you In!');
				addNotication({
					title: 'Logging you In!',
					id: id,
					type: 'success',
					autoDismiss: true,
					autoTimeoutTime: 2000
				});
				setAuth(data.login.token);
				localStorage.setItem('bolttoken', data.login.token);
				history.push('/');
			}
		}
	}, [data, loading, error, errorState, history, setAuth, addNotication, id]);

	return {
		errorState,
		loginCredentials,
		setLoginCredentials,
		usernameType,
		setUsernameType
	};
};
