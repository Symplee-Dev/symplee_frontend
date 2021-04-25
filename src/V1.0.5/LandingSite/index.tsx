import './index.scss';
import { Footer } from './Footer';
import { useLoginMutation, useSignupMutation } from '../../graphql';
import { useLogin, onLoginSubmit } from '../../hooks/useLoginForm';
import Button from '../components/Button/Button';
import { useState, FormEvent } from 'react';
import { useRegister, onRegisterSubmit } from '../../hooks/useRegisterForm';

const LandingSite = () => {
	const [
		login,
		{ data: loginData, loading: loginLoading, error: loginError }
	] = useLoginMutation();

	const [formMode, setFormMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

	const {
		errorState,
		loginCredentials,
		setLoginCredentials,
		setUsernameType,
		usernameType
	} = useLogin(loginLoading, loginError, loginData);

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

	const [signup, { data, loading, error }] = useSignupMutation();

	const { registerCredentials, setRegisterCredentials } = useRegister(
		loading,
		error,
		data
	);

	const onRegisterChange = event => {
		setRegisterCredentials({
			...registerCredentials,
			[event.target.name]: event.target.value
		});
	};

	const onRegisterSubmission = (e: FormEvent) => {
		onRegisterSubmit(e, registerCredentials, signup);
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
					<form
						className="fields"
						onSubmit={formMode === 'LOGIN' ? onSubmit : onRegisterSubmission}
					>
						{formMode === 'LOGIN' && (
							<>
								<div className="field">
									<p>Username</p>
									<input
										required
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
										required
										autoComplete="current-password"
										name="password"
										onChange={onChange}
										type="password"
										className="input-field"
										value={loginCredentials.password}
									/>
								</div>
							</>
						)}
						{formMode === 'REGISTER' && (
							<>
								<div className="field">
									<p>Full Name</p>
									<input
										required
										type="text"
										name="name"
										onChange={onRegisterChange}
										className="input-field"
										value={registerCredentials.name}
									/>
								</div>
								<div className="field">
									<p>Username</p>
									<input
										required
										name="username"
										onChange={onRegisterChange}
										type="text"
										className="input-field"
										value={registerCredentials.username}
									/>
								</div>
								<div className="field">
									<p>Email</p>
									<input
										required
										name="email"
										onChange={onRegisterChange}
										type="email"
										className="input-field"
										value={registerCredentials.email}
									/>
								</div>
								<div className="field">
									<p>Password</p>
									<input
										required
										name="password"
										onChange={onRegisterChange}
										type="password"
										className="input-field"
										value={registerCredentials.password}
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
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LandingSite;
