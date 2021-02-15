import React, { FormEvent, useState } from 'react';
import './style.scss';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import FadeIn from 'react-fade-in';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const [registerCredentials, setRegisterCredentials] = useState({
		username: '',
		email: '',
		password: '',
		name: ''
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
		<>
			<NavBar />
			<motion.div
				className="signup signup__container"
				exit={{ opacity: 0 }}
			>
				<FadeIn delay={300}>
					<h3>Get Started!</h3>
					<form onSubmit={onSubmit}>
						<p className="input-title">Full Name</p>
						<TextField
							required
							name="name"
							color="primary"
							variant="filled"
							className="input-field"
							type="text"
							value={registerCredentials.name}
							onChange={onChange}
							inputProps={{
								className: 'input-field'
							}}
						/>
						<p className="input-title">Username</p>
						<TextField
							required
							name="username"
							color="primary"
							variant="filled"
							className="input-field"
							type="text"
							value={registerCredentials.username}
							onChange={onChange}
							inputProps={{
								className: 'input-field'
							}}
						/>
						<p className="input-title">Email</p>
						<TextField
							required
							name="email"
							color="primary"
							variant="filled"
							className="input-field"
							type="email"
							value={registerCredentials.email}
							onChange={onChange}
							inputProps={{
								className: 'input-field'
							}}
						/>
						<p className="input-title">Password</p>
						<TextField
							required
							name="password"
							color="primary"
							variant="filled"
							className="input-field"
							type="password"
							value={registerCredentials.password}
							onChange={onChange}
							inputProps={{
								className: 'input-field'
							}}
						/>
						<Link to="/login">Already have an account?</Link>
						<button>Create Account</button>
					</form>
				</FadeIn>
			</motion.div>
		</>
	);
};

export default Register;
