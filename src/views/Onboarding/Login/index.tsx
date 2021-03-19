import { motion } from 'framer-motion';
import NavBar from '../../../components/Navbar/NavBar';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import { LinearProgress, MenuItem, Select } from '@material-ui/core';
import { useLogin, onLoginSubmit } from '../../../hooks/useLoginForm';
import { useLoginMutation } from '../../../graphql';
import { createTextField } from '../createTextField';
import './style.scss';

const Login = () => {
	const [login, { data, loading, error }] = useLoginMutation();

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
		<>
			<NavBar />
			<div className="login login__container">
				<motion.div exit={{ opacity: 0 }}>
					<FadeIn delay={300}>
						<h3>Welcome Back!</h3>
						<form onSubmit={onSubmit}>
							{/* Switch component = using username or email */}
							<p className="input-title">Login With</p>
							<Select
								value={usernameType}
								className="username-select"
								onChange={e => {
									setLoginCredentials({
										...loginCredentials,
										username: ''
									});
									setUsernameType(
										e.target.value as 'EMAIL' | 'USERNAME'
									);
								}}
							>
								<MenuItem value="EMAIL">Email</MenuItem>
								<MenuItem value="USERNAME">Username</MenuItem>
							</Select>
							{usernameType === 'EMAIL' &&
								createTextField(
									onChange,
									'username',
									loginCredentials.username,
									'Email',
									'text'
								)}

							{usernameType === 'USERNAME' && (
								<>
									<p className="input-title">
										Username And Key
									</p>

									<div className="username-input-group">
										{createTextField(
											onChange,
											'username',
											loginCredentials.username,
											'',
											'text',
											false
										)}

										{createTextField(
											onChange,
											'key',
											loginCredentials.key,
											'',
											'text',
											false,
											'key-field'
										)}
									</div>
								</>
							)}

							{createTextField(
								onChange,
								'password',
								loginCredentials.password,
								'Password',
								'password'
							)}
							<Link to="/signup">Don't have an account?</Link>
							{errorState.length > 0 && (
								<p className="input-title error">
									{errorState.toString()}
								</p>
							)}
							{!loading ? (
								<button>Log In</button>
							) : (
								<LinearProgress
									color="primary"
									style={{
										marginTop: '1.5rem',
										width: '100%'
									}}
								/>
							)}
						</form>
					</FadeIn>
				</motion.div>
			</div>
		</>
	);
};

export default Login;
