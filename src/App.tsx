import { Route, useLocation, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';

// views
import Login from './views/Onboarding/Login';
import Home from '../src/views/Home';
import Register from './views/Onboarding/Register';
import ForgotPassword from './views/Onboarding/ForgotPassword';

import { AnimatePresence } from 'framer-motion';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import HomeApp from './views/HomeApp/index';
import EmailVerificationScreen from './views/EmailVerificationScreen/EmailVerificationScreen';
import { useLocalToken } from './hooks/useLocalToken';
import Notifications from './components/Notifications';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BB86FC'
		}
	}
});

const App = () => {
	const location = useLocation();
	const authenticated = useLocalToken();

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
						<Route exact path="/forgot-password">
							<ForgotPassword />
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
