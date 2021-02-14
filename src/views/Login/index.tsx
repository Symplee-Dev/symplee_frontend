import React, { FormEvent, useState } from 'react';
// import styled from 'styled-components';
import './style.scss'
import Input from '../../components/custom_styled_components/Input';
import { motion } from 'framer-motion';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const [loginCredentials, setLoginCredentials] = useState({
		username: '',
		password: ''
	});

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
	<div className='login login__container'>
		<motion.div exit={{ opacity: 0 }}>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<Input
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
				/>
				<button type="submit">Login</button>
			</form>
		</motion.div>
	</div>
	);
};

export default Login;
