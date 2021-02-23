import { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { SignupMutation, Exact } from '../graphql';
import { ApolloError, MutationFunctionOptions } from '@apollo/client';
import { UIActions } from '../redux/actions/index';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';

export type RegisterCredentials = {
	username: string;
	email: string;
	password: string;
	name: string;
};

export const useRegister = (
	loading: boolean,
	error: ApolloError | undefined,
	data: SignupMutation | null | undefined
) => {
	const history = useHistory();

	const addNotication = UIActions.useAddNotification();

	const id = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const [registerCredentials, setRegisterCredentials] = useState({
		username: '',
		email: '',
		password: '',
		name: ''
	});

	useEffect(() => {
		if (!loading) {
			if (error) {
				addNotication({
					title: error.message,
					id,
					type: 'danger',
					autoDismiss: true,
					autoTimeoutTime: 3000
				});
			}

			if (!error && data) {
				addNotication({
					title: 'Almost There! Please Login',
					id: id + 1,
					type: 'success',
					autoDismiss: true,
					autoTimeoutTime: 3000
				});
				history.push('/login');
			}
		}
	}, [data, error, history, loading, addNotication, id]);

	return {
		registerCredentials,
		setRegisterCredentials
	};
};

export const onRegisterSubmit = (
	e: FormEvent,
	registerCredentials: RegisterCredentials,
	signup: (
		options?:
			| MutationFunctionOptions<
					SignupMutation,
					Exact<{
						email: string;
						name: string;
						username: string;
						password: string;
					}>
			  >
			| undefined
	) => void
) => {
	e.preventDefault();

	signup({
		variables: {
			...registerCredentials
		}
	});
};
