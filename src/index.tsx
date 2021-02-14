import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './scss/indexStyle.scss';

const apolloClient = new ApolloClient({
	uri: 'https://bolt--backend.herokuapp.com/graphql',
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
