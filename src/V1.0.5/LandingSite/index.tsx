import './index.scss';
import { Footer } from './Footer';
import { useLoginMutation } from '../../graphql';
import { useLogin, onLoginSubmit } from '../../hooks/useLoginForm';
import Button from '../components/Button/Button';
import { useState } from 'react';

const LandingSite = () => {
	const [login, { data, loading, error }] = useLoginMutation();

	const [formMode, setFormMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

	const {
		errorState,
		loginCredentials,
		setLoginCredentials,
		setUsernameType,
		usernameType
	} = useLogin(loading, error, data);

	const onChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setLoginCredentials({
			...loginCredentials,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = e => {
		onLoginSubmit(e, usernameType, loginCredentials, login);
	};

	return (
		<div className="landing-site">
			<div className="landing-top">
				<div className="card">
					<div className="card-top">
						<h1>Welcome to Symplee</h1>
						<p className="subtitle">
							This app is currently in development and you will experience bugs
							and inconveniences.
						</p>
					</div>
					<div className="fields">
						{formMode === 'LOGIN' && (
							<>
								<div className="field">
									<p>Username</p>
									<input
										type="email"
										name="username"
										onChange={onChange}
										className="input-field"
										value={loginCredentials.username}
									/>
								</div>
								<div className="field">
									<p>Password</p>
									<input
										name="password"
										onChange={onChange}
										type="password"
										className="input-field"
										value={loginCredentials.password}
									/>
								</div>
							</>
						)}
						<p
							style={{ marginTop: '0.5rem' }}
							className="switch-mode-btn"
							onClick={() =>
								setFormMode(formMode === 'LOGIN' ? 'REGISTER' : 'LOGIN')
							}
						>
							{formMode === 'LOGIN'
								? "Don't Have An Account?"
								: 'Already Have An Account?'}
						</p>

						<Button
							clickHandler={() =>
								onLoginSubmit(
									{ preventDefault: () => {} } as any,
									usernameType,
									loginCredentials,
									login
								)
							}
							content="Submit"
							size="large"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LandingSite;
