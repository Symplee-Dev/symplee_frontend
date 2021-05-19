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
import Login from '../views/Onboarding/Login/index';
import Register from '../views/Onboarding/Register/index';
import LandingSite from './LandingSite/index';
import Notifications from '../components/Notifications';

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
					<Notifications />
					<Switch location={location}>
						<Route exact path="/">
							<LandingSite />
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
			<Notifications />

			{isElectron() && <DesktopWindowBar />}
			<Home isElectron={isElectron()} />
		</ErrorBoundary>
	);
};

export default App;
