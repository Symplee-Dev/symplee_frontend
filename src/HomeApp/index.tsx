import Sidebar from './SideBar';
import './index.scss';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';

import { RootStateOrAny, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';
import { useUserQuery } from '../graphql';

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const { data, loading } = useUserQuery({
		variables: { id: userId }
	});

	if (loading) return <CircularProgress color="primary" />;

	if (!loading && data && data.user) {
		return (
			<div className="home-app">
				<Sidebar chatGroups={data.user.chatGroups} />
				<Switch location={location}>
					<Route exact path="/you">
						<Account user={data.user} />
					</Route>
					<Route path="/">
						<HomeAppRoot user={data.user} />
					</Route>
				</Switch>
			</div>
		);
	}

	return null;
};

export default HomeApp;
