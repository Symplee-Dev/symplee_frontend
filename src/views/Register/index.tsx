import React, { FormEvent, useState } from 'react';
import Input from '../../components/custom_styled_components/Input';
import './style.scss';
import { motion } from 'framer-motion';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const [registerCredentials, setRegisterCredentials] = useState({
		username: '',
		email: '',
		password: ''
	});
	const onChange = event => {
		setRegisterCredentials({
			...registerCredentials,
			[event.target.name]: event.target.value
		});
	};
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<motion.div className="signup signup__container" exit={{ opacity: 0 }}>
			<h1>Sign Up</h1>
			<form onSubmit={onSubmit}>
				<Input
					name="username"
					label="Username"
					value={registerCredentials.username}
					onChange={onChange}
				/>
				<Input
					name="email"
					label="Email"
					type="email"
					value={registerCredentials.email}
					onChange={onChange}
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					value={registerCredentials.password}
					onChange={onChange}
				/>
				<Input
					name="confirmPassword"
					label="Confirm Password"
					type="password"
				/>
				<button type="submit">Register</button>
			</form>
		</motion.div>
	);
};

export default Register;
