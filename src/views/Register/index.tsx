import React, { FormEvent, useState, useEffect } from 'react';
import './style.scss';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import FadeIn from 'react-fade-in';
import { TextField, LinearProgress, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useSignupMutation } from '../../graphql';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
	const history = useHistory();

	const [registerCredentials, setRegisterCredentials] = useState({
		username: '',
		email: '',
		password: '',
		name: ''
	});

	const [errorState, setErrorState] = useState('');

	const [signup, { data, loading, error }] = useSignupMutation();

	const [notifState, setNotifState] = useState(false);

	const onChange = event => {
		setRegisterCredentials({
			...registerCredentials,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		signup({
			variables: {
				...registerCredentials
			}
		});
	};

	useEffect(() => {
		if (!loading) {
			if (error) {
				setErrorState(error.message);
			}

			if (!error && data) {
				setNotifState(true);
				setTimeout(() => {
					history.push('/login');
				}, 2000);
			}
		}
	}, [data, error, history, loading]);

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
						{errorState.length > 0 && (
							<p className="input-title error">
								{errorState.toString()}
							</p>
						)}
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
					<Snackbar
						open={notifState}
						autoHideDuration={3000}
						onClose={() => setNotifState(false)}
					>
						<Alert onClose={() => setNotifState(false)}>
							You're almost there! Please sign in.
						</Alert>
					</Snackbar>
				</FadeIn>
			</motion.div>
		</>
	);
};

export default Register;
