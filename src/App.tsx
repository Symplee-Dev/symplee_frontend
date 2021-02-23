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
import HomeApp from './HomeApp/index';
import EmailVerificationScreen from './views/EmailVerificationScreen/EmailVerificationScreen';
import { useLocalToken } from './hooks/useLocalToken';

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

	console.log(authenticated);

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
