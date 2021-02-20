import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';

// views
import Login from '../src/views/Login';
import Home from '../src/views/Home';
import Register from './views/Register';
import UserUi from './views/UserUI';

import { AnimatePresence } from 'framer-motion';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelectAuth } from './redux/selectors';
import HomeApp from './HomeApp/index';
import decode from 'jwt-decode';
import { SET_USER_ID } from './redux/actions/index';
import EmailVerificationScreen from './views/EmailVerificationScreen/EmailVerificationScreen';

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const location = useLocation();

	const dispatch = useDispatch();
	const authenticated = useSelectAuth();

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#BB86FC'
			}
		}
	});

	useEffect(() => {
		if (authenticated !== undefined && authenticated === false) {
			const token = localStorage.getItem('bolttoken');

			if (token && token.length > 0) {
				const user: { userId: number; username: string } = decode(
					token ?? ''
				);

				if (user.userId !== undefined) {
					dispatch({
						type: SET_USER_ID,
						payload: { userId: user.userId }
					});
				}
			}
		}
	}, [dispatch, authenticated]);

	return (
		<ErrorBoundary
			FallbackComponent={ErrorPage}
			onReset={() => window.location.reload()}
		>
			<ThemeProvider theme={theme}>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<Register />
						</Route>
						<Route exact path="/chat">
							<UserUi />
						</Route>

						<Route exact path="/auth/verify/:token">
							<EmailVerificationScreen />
						</Route>

						<Route path="/">
							{authenticated ? <HomeApp /> : <Home />}
						</Route>
					</Switch>
				</AnimatePresence>
			</ThemeProvider>
		</ErrorBoundary>
	);
};

export default App;
