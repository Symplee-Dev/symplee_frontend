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
import HomeApp from './HomeApp/index';
import decode from 'jwt-decode';
import EmailVerificationScreen from './views/EmailVerificationScreen/EmailVerificationScreen';
import { UserSelectors } from './redux/selectors';
import { UserActions } from './redux/actions/index';

interface DecodedToken {
	userId: number;
	username: string;
}

const App = () => {
	const location = useLocation();

	const dispatch = useDispatch();
	const authenticated = UserSelectors.useSelectAuth();
	const setUserId = UserActions.useSetUserId();

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
				const user: DecodedToken = decode(token ?? '');

				if (user.userId !== undefined) {
					setUserId(user.userId);
				}
			}
		}
	}, [dispatch, authenticated, setUserId]);

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
