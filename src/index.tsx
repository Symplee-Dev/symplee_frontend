import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './scss/indexStyle.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import LogRocket from 'logrocket';
LogRocket.init('bolts-dev-team/bolt-chat');

export const apolloClient = new ApolloClient({
	uri:
		process.env.NODE_ENV === 'production'
			? 'https://bolt--backend.herokuapp.com/graphql'
			: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
	defaultOptions: {
		mutate: { errorPolicy: 'all' },
		query: { errorPolicy: 'all' }
	}
});

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<Router>
				<App />
			</Router>
		</ApolloProvider>
	</Provider>,
	document.getElementById('root')
);
