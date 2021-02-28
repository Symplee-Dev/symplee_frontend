import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { useHistory, useParams } from 'react-router-dom';
import { useUpdateUserMutation } from '../../graphql';
import { TextField } from '@material-ui/core';

interface Props {}

const ResetPassword = (props: Props) => {
	const history = useHistory();
	const rootClass = 'resetPassword';
	const params = useParams<{ token: string }>();
	const [passwords, setPasswords] = useState({
		password: '',
		confirmPassword: ''
	});
	const [error, setError] = useState('');

	useEffect(() => {
		window.localStorage.setItem('bolttoken', params.token);
	}, [params]);

	const [updateUser, { loading }] = useUpdateUserMutation({
		onCompleted: data => {
			if (data) {
				history.replace('/login');
			}
		}
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (error) {
			setError('');
		}
		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (passwords.password === passwords.confirmPassword) {
			updateUser({
				variables: {
					user: {
						password: passwords.password
					}
				}
			});
		} else {
			setError('Passwords do not match');
		}
	};

	return (
		<>
			<NavBar />
			<form className={rootClass} onSubmit={handleSubmit}>
				<h1>Reset Password</h1>
				<TextField
					name="password"
					label="Password"
					value={passwords.password}
					onChange={handleChange}
					className="inputField"
					variant="filled"
				/>
				<TextField
					name="confirmPassword"
					label="Confirm Password"
					value={passwords.confirmPassword}
					onChange={handleChange}
					className="inputField"
					variant="filled"
				/>
				<button disabled={loading} type="submit">
					Submit Passwords
				</button>
				{!!error && <p>{error}</p>}
			</form>
		</>
	);
};

export default ResetPassword;
