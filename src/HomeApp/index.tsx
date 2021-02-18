import Sidebar from './SideBar';
import './index.scss';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';

//@ts-ignore
import { useUserQuery } from '../@types/graphql/generated.d.ts';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const { data, loading, error } = useUserQuery({
		variables: { id: userId }
	});

	// TODO: Navigae to error screen
	if (error) throw window.location.reload();

	if (loading) return <CircularProgress color="primary" />;

	if (!loading) {
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
