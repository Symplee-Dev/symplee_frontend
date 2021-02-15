import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';

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
		const token = localStorage.getItem('bolttoken');
		if (token && token.length > 0) {
			dispatch({ type: 'SET_LOGGED_IN', payload: token });
		}
	}, [dispatch]);

	return (
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

					<Route path="/">
						{authenticated ? <HomeApp /> : <Home />}
					</Route>
				</Switch>
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
