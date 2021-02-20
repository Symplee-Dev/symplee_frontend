import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './scss/indexStyle.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import setupLogRocketReact from 'logrocket-react';
import LogRocket from 'logrocket';

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0
});

LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ORG_ID!);
setupLogRocketReact(LogRocket);

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
