import React, { FormEvent } from 'react';
import Input from '../../components/custom_styled_components/Input';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<Input id="username" name="username" label="Username" />
				<Input
					id="password"
					name="password"
					label="Password"
					type="password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
