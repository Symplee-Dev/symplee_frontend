import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';

// views
import Login from '../src/views/Login';
import Home from '../src/views/Home';
import Register from './views/Register';
import UserUi from './views/UserUI';

import { AnimatePresence } from 'framer-motion';

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup" component={Register} />
				<Route path="/chat" component={UserUi} />
				<Route path="/" component={Home} />
			</Switch>
		</AnimatePresence>
	);
};

export default App;
