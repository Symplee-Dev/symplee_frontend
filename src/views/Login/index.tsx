import React, { FormEvent, useState } from 'react';

import Input from '../../components/custom_styled_components/Input';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	});

	const onChange = event => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<Input
					id="username"
					name="username"
					label="Username"
					value={credentials.username}
					onChange={onChange}
				/>
				<Input
					id="password"
					name="password"
					label="Password"
					type="password"
					value={credentials.password}
					onChange={onChange}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
