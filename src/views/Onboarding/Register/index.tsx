import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../../components/Navbar/NavBar';
import FadeIn from 'react-fade-in';
import { LinearProgress } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useSignupMutation } from '../../../graphql';
import { useRegister, onRegisterSubmit } from '../../../hooks/useRegisterForm';
import { createTextField } from '../createTextField';
import './style.scss';

const Register = () => {
	const [signup, { data, loading, error }] = useSignupMutation();
	const [agreement, setAgreement] = useState(false);

	const { registerCredentials, setRegisterCredentials } = useRegister(
		loading,
		error,
		data
	);

	const params = useParams();
	console.log(params);
	const onChange = event => {
		setRegisterCredentials({
			...registerCredentials,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = (e: FormEvent) => {
		if (agreement) onRegisterSubmit(e, registerCredentials, signup);
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
						{createTextField(
							onChange,
							'name',
							registerCredentials.name,
							'Full Name'
						)}

						{createTextField(
							onChange,
							'username',
							registerCredentials.username,
							'Username'
						)}

						{createTextField(
							onChange,
							'email',
							registerCredentials.email,
							'Email',
							'email'
						)}

						{createTextField(
							onChange,
							'password',
							registerCredentials.password,
							'Password',
							'password'
						)}

						<div className="tos_agreement">
							<input
								type="checkbox"
								checked={agreement}
								onChange={() => setAgreement(!agreement)}
							/>
							<span>
								I have read and agreed to the{' '}
								<a href="/terms" target="blank">
									terms and conditions
								</a>
								.
							</span>
						</div>

						<Link to="/login">Already have an account?</Link>

						{!loading ? (
							<button>Create Account</button>
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
		</>
	);
};

export default Register;
