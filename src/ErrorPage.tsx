import {
	createMuiTheme,
	LinearProgress,
	TextField,
	ThemeProvider
} from '@material-ui/core';
import { useState } from 'react';
import errorBG from './assets/error_bg.svg';
import { useSendFeedbackMutation } from './graphql';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BB86FC'
		}
	}
});

const ErrorPage = ({ error, resetErrorBoundary }) => {
	console.log(error);
	document.body.classList.add('body-app');

	const [formState, setFormState] = useState({
		userName: '',
		userEmail: '',
		body: '',
		error: error.toString()
	});

	const [
		sendFeedback,
		{ data, loading, error: feedbackError }
	] = useSendFeedbackMutation();

	const handleSubmit = e => {
		e.preventDefault();

		sendFeedback({ variables: { feedback: formState } });
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="error-root">
				<div className="left">
					<h3>
						Unfortunately we have encountered an unexpected error.
					</h3>
					<img
						src={errorBG}
						alt="error logo"
						className="error-logo"
					/>
				</div>
				<div className="right">
					<h1>Send Us Feedback</h1>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							color="primary"
							placeholder="Full Name"
							variant="filled"
							inputProps={{ className: 'input-field' }}
							className="input-field-root"
							value={formState.userName}
							onChange={e =>
								setFormState({
									...formState,
									userName: e.target.value
								})
							}
						/>
						<TextField
							fullWidth
							color="primary"
							required
							placeholder="Email"
							type="email"
							variant="filled"
							inputProps={{ className: 'input-field' }}
							className="input-field-root"
							value={formState.userEmail}
							onChange={e =>
								setFormState({
									...formState,
									userEmail: e.target.value
								})
							}
						/>
						<TextField
							fullWidth
							color="primary"
							multiline
							required
							placeholder="Tell us what happenned?"
							variant="filled"
							inputProps={{ className: 'input-field' }}
							className="input-field-root"
							rows={4}
							rowsMax={10}
							value={formState.body}
							onChange={e =>
								setFormState({
									...formState,
									body: e.target.value
								})
							}
						/>
						{!data && !feedbackError && (
							<button type="submit">Send Feedback</button>
						)}

						{feedbackError && (
							<>
								<p>{feedbackError?.message}</p>
								<button type="submit">Try Again</button>
							</>
						)}

						{data && !feedbackError && (
							<button onClick={() => resetErrorBoundary()}>
								Reload
							</button>
						)}

						{loading && (
							<LinearProgress
								color="primary"
								style={{ width: '100%' }}
							/>
						)}
					</form>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default ErrorPage;
