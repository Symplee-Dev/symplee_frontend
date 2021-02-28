import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../../components/NavBar';
import { useSendForgotPasswordEmailMutation } from '../../../graphql';
import { createTextField } from '../createTextField';

interface Props {}

const ForgotPasswordView = (props: Props) => {
	const [userCredential, setUserCredential] = useState('');
	const [errors, setErrors] = useState('');
	const history = useHistory();
	const onChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUserCredential(e.target.value);
		if (errors) {
			setErrors('');
		}
	};

	const [sendEmail, { loading }] = useSendForgotPasswordEmailMutation({
		onCompleted: data => {
			if (data.sendForgotPasswordEmail) {
				history.push('/');
			}
		},
		onError: err => {
			setErrors('Invalid Email');
		}
	});

	const rootClass = 'forgotPassword';

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendEmail({
			variables: {
				email: userCredential
			}
		});
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
				{!!errors && <p>{errors}</p>}
				<div className="inputField">
					{createTextField(
						onChange,
						'username',
						userCredential,
						'Email',
						'text'
					)}
				</div>
				<button type="submit" disabled={loading}>
					Submit
				</button>
			</form>
		</>
	);
};

export default ForgotPasswordView;
