import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

const apolloClient = new ApolloClient({
	uri: '',
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);
