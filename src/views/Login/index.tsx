import React, { FormEvent, useState } from 'react';
// import styled from 'styled-components';
import './style.scss';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import FadeIn from 'react-fade-in';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const [loginCredentials, setLoginCredentials] = useState({
		username: '',
		password: '',
		email: ''
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
							{usernameType === 'EMAIL' && (
								<p className="input-title">Email</p>
							)}

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
