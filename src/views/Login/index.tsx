import React, { FormEvent, useState } from 'react';
// import styled from 'styled-components';
import './style.scss';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import FadeIn from 'react-fade-in';
import { MenuItem, Select, TextField } from '@material-ui/core';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const [loginCredentials, setLoginCredentials] = useState({
		username: '',
		password: '',
		key: ''
	});

	const [usernameType, setUsernameType] = useState<'USERNAME' | 'EMAIL'>(
		'EMAIL'
	);

	//@ts-ignore
	const onChange = event => {
		setLoginCredentials({
			...loginCredentials,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
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
										name="username"
										variant="filled"
										className="input-field"
										type="email"
										value={loginCredentials.username}
										onChange={onChange}
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
											name="username"
											variant="filled"
											className="input-field"
											type="text"
											value={loginCredentials.username}
											onChange={onChange}
										/>
										<TextField
											name="key"
											className="key-field"
											variant="filled"
											value={loginCredentials.key}
											onChange={onChange}
										/>
									</div>
								</>
							)}

							<p className="input-title">Password</p>
							<TextField
								name="password"
								variant="filled"
								className="input-field"
								type="password"
								value={loginCredentials.password}
								onChange={onChange}
							/>

							{/* <Input
							id="username"
							name="username"
							label="Username"
							value={loginCredentials.username}
							onChange={onChange}
							required
						/>
						<Input
							id="password"
							name="password"
							label="Password"
							type="password"
							value={loginCredentials.password}
							onChange={onChange}
							required
						/> */}
							{/* <button type="submit">Login</button> */}
						</form>
					</FadeIn>
				</motion.div>
			</div>
		</>
	);
};

export default Login;
