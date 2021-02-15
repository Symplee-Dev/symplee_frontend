import React, { FormEvent, useEffect, useState } from 'react';
import './style.scss';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import { LinearProgress, MenuItem, Select, TextField } from '@material-ui/core';
//@ts-ignore
import { useLoginMutation } from '../../@types/graphql/generated.d.ts';
import { useHistory } from 'react-router';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const history = useHistory();

	const [loginCredentials, setLoginCredentials] = useState({
		username: '',
		password: '',
		key: ''
	});
	const [errorState, setErrorState] = useState('');

	const [usernameType, setUsernameType] = useState<'USERNAME' | 'EMAIL'>(
		'EMAIL'
	);

	const [login, { data, loading, error }] = useLoginMutation();

	const onChange = event => {
		setLoginCredentials({
			...loginCredentials,
			[event.target.name]: event.target.value
		});
	};

	useEffect(() => {
		if (!loading) {
			if (error) {
				setErrorState(error.message);
			}

			if (!error && data) {
				history.push('/app');
			}
		}
	}, [data, loading, error, errorState, history]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (usernameType === 'USERNAME') {
			setLoginCredentials({
				...loginCredentials,
				username: loginCredentials.username + '#' + loginCredentials.key
			});

			login({
				variables: {
					username: loginCredentials.username,
					password: loginCredentials.password
				}
			});
		} else {
			console.log(loginCredentials);
			login({
				variables: {
					email: loginCredentials.username,
					password: loginCredentials.password
				}
			});
		}
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
							{usernameType === 'EMAIL' && (
								<>
									<p className="input-title">Email</p>
									<TextField
										required
										color="primary"
										name="username"
										variant="filled"
										className="input-field"
										type="email"
										value={loginCredentials.username}
										onChange={onChange}
										inputProps={{
											className: 'input-field'
										}}
									/>
								</>
							)}

							{usernameType === 'USERNAME' && (
								<>
									<p className="input-title">
										Username And Key
									</p>

									<div className="username-input-group">
										<TextField
											required
											name="username"
											color="primary"
											variant="filled"
											className="input-field"
											type="text"
											value={loginCredentials.username}
											onChange={onChange}
											inputProps={{
												className: 'input-field'
											}}
										/>
										<TextField
											required
											color="primary"
											name="key"
											className="key-field"
											variant="filled"
											value={loginCredentials.key}
											onChange={onChange}
											inputProps={{
												className: 'input-field'
											}}
										/>
									</div>
								</>
							)}

							<p className="input-title">Password</p>
							<TextField
								required
								name="password"
								variant="filled"
								color="primary"
								className="input-field"
								type="password"
								value={loginCredentials.password}
								onChange={onChange}
								inputProps={{
									className: 'input-field'
								}}
							/>
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
