import { Route, useLocation, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';

// views
import Login from './views/Onboarding/Login';
import Home from '../src/views/Home';
import Register from './views/Onboarding/Register';

import { AnimatePresence } from 'framer-motion';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import HomeApp from './views/HomeApp/index';
import EmailVerificationScreen from './views/EmailVerificationScreen/EmailVerificationScreen';
import { useLocalToken } from './hooks/useLocalToken';
import Notifications from './components/Notifications';
import { useReactPath } from './hooks/useReactPath';
import { useEffect } from 'react';
import { UIActions } from './redux/actions/index';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FFFFFF'
		}
	}
});

const App = () => {
	const location = useLocation();
	const authenticated = useLocalToken();
	const clearChat = UIActions.useClearCurrentChat();

	const path = useReactPath();

	useEffect(() => {
		if (!path.includes('/chat') || !path.includes('/dm')) {
			clearChat();
		}
	}, [path, clearChat]);

	return (
		<ErrorBoundary
			FallbackComponent={ErrorPage}
			onReset={() => window.location.reload()}
		>
			<ThemeProvider theme={theme}>
				<AnimatePresence exitBeforeEnter>
					<Notifications />
					<Switch location={location} key={location.pathname}>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<Register />
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
