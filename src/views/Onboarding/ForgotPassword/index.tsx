import { Button } from '@material-ui/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import NavBar from '../../../components/NavBar';
import { createTextField } from '../createTextField';

interface Props {}

const ForgotPasswordView = (props: Props) => {
	const [userCredential, setUserCredential] = useState('');
	const onChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUserCredential(e.target.value);
	};

	const rootClass = 'forgotPassword';

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<>
			<NavBar />
			<form className={rootClass} onSubmit={handleSubmit}>
				<h3>Oh no! Forgot your password?</h3>
				<p>
					Dont worry, we will be sending you an email with a link to
					reset your password.
				</p>
				<div className="inputField">
					{createTextField(
						onChange,
						'username',
						userCredential,
						'Email',
						'text'
					)}
				</div>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default ForgotPasswordView;
