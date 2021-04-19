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

const App = () => {
	const location = useLocation();
	const authenticated = useLocalToken();
	UserActions.useGetUser();

	if (!authenticated) {
		<ErrorBoundary
			FallbackComponent={ErrorPage}
			onReset={() => window.location.reload()}
		>
			<Switch location={location}>
				<Route exact path="/">
					Login Page
				</Route>
			</Switch>
		</ErrorBoundary>;
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