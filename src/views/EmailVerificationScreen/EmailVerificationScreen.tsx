import './style.scss';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import NavBar from '../../components/Navbar/NavBar';
import { useVerifyEmailMutation } from '../../graphql';
import { useEffect, useState } from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useHistory } from 'react-router';

const EmailVerificationScreen = () => {
	const { token }: { token: string } = useParams();
	const history = useHistory();

	const [timeLeft, setTimeLeft] = useState(3);

	const [verify, { data, loading, error }] = useVerifyEmailMutation();

	useEffect(() => {
		verify({ variables: { token } });
	}, [token, verify]);

	useEffect(() => {
		let countdown;
		if (!loading && !error && data) {
			countdown = setInterval(() => {
				if (timeLeft > 0) {
					const timeleft = timeLeft;
					setTimeLeft(timeleft - 1);
				}

				if (timeLeft <= 0) {
					clearInterval(countdown);
					history.push('/');
				}
			}, 1000);
		}
		return () => {
			clearInterval(countdown);
		};
	});

	if (!loading && !error && data) {
		return (
			<>
				<NavBar />
				<div className="verify-root">
					<h5>Your account is now verified!</h5>
					<p>Redirecting you in {timeLeft} seconds</p>
					<VerifiedUserIcon className="icon" />
				</div>
			</>
		);
	}

	return (
		<>
			<NavBar />
			<div className="verify-root">
				<h5>Just a moment while we verify your information.</h5>
				<CircularProgress />
			</div>
		</>
	);
};

export default EmailVerificationScreen;
