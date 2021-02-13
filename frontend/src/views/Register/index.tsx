import React, { FormEvent } from 'react';
import Input from '../../components/custom_styled_components/Input';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={onSubmit}>
				<Input name="username" label="Username" />
				<Input name="email" label="Email" type="email" />
				<Input name="password" label="Password" type="password" />
				<Input
					name="confirmPassword"
					label="Confirm Password"
					type="password"
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
