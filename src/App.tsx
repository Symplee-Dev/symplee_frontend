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
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/signup">
					<Register />
				</Route>
				<Route exact path="/chat">
					<UserUi />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</AnimatePresence>
	);
};

export default App;
