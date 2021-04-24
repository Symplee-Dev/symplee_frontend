import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../ErrorPage';
import { useLocation } from 'react-router';
import { useLocalToken } from '../hooks/useLocalToken';

import { Home } from './Home';
import { DesktopWindowBar } from './DesktopWindowBar';

import './index.scss';
import { isElectron } from '../utils/createNotification';
import { UserActions } from '../redux/actions/index';
import HomePage from '../views/Home/index';
import Login from '../views/Onboarding/Login/index';
import Register from '../views/Onboarding/Register/index';

const App = () => {
	const location = useLocation();
	const authenticated = useLocalToken();
	UserActions.useGetUser();

	if (!authenticated) {
		return (
			<div>
				<ErrorBoundary
					FallbackComponent={ErrorPage}
					onReset={() => window.location.reload()}
				>
					<Switch location={location}>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<Register />
						</Route>
						<Route exact path="/">
							<HomePage />
						</Route>
					</Switch>
				</ErrorBoundary>
			</div>
		);
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorPage}
			onReset={() => window.location.reload()}
		>
			{isElectron() && <DesktopWindowBar />}
			<Home isElectron={isElectron()} />
		</ErrorBoundary>
	);
};

export default App;
