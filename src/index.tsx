import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './scss/indexStyle.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import setupLogRocketReact from 'logrocket-react';
import LogRocket from 'logrocket';

import * as offlineWorker from './serviceWorkerRegistration';
import { apolloClient } from './client';

import appUtilities from './utils/app-utilities';

appUtilities.test();

// Cache Worker
offlineWorker.register();

if (process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_DSN,
		integrations: [new Integrations.BrowserTracing()],
		tracesSampleRate: 1.0
	});

	LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ORG_ID!);
	setupLogRocketReact(LogRocket);
}

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
