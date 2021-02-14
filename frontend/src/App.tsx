import React from 'react';
import { Route } from 'react-router';

// views
import Login from '../src/views/Login';
import Home from '../src/views/Home';
import Register from './views/Register';
import UserUi from './views/UserUI';

import NavBar from './components/NavBar';
import { Container } from '@material-ui/core';

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<>
			<NavBar />
			<Container>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Register} />
				<Route path="/chat" component={UserUi} />
				<Route exact path="/" component={Home} />
			</Container>
		</>
	);
};

export default App;
