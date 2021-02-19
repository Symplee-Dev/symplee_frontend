import Sidebar from './SideBar';
import './index.scss';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';

import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';
import { useUserQuery } from '../graphql';
import CreateGroup from './views/CreateGroup';
import { useEffect } from 'react';
import decode from 'jwt-decode';
import { SET_USER_ID, SET_LOGGED_IN } from '../redux/actions/index';

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	const dispatch = useDispatch();

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const { data, loading, error, refetch } = useUserQuery({
		variables: { id: userId }
	});

	if (error) {
		refetch({ id: userId });
	}

	useEffect(() => {
		const token = localStorage.getItem('bolttoken');

		if (token && token.length > 0) {
			const user: { userId: number; username: string } = decode(
				token ?? ''
			);
			console.log(user);
			dispatch({ type: SET_USER_ID, payload: { userId: user.userId } });
			dispatch({ type: SET_LOGGED_IN, payload: token });
		}
	}, [dispatch]);

	if (loading) return <CircularProgress color="primary" />;

	if (!loading && data && data.user) {
		return (
			<div className="home-app">
				<Sidebar chatGroups={data.user.chatGroups} />
				<Switch location={location}>
					<Route exact path="/you">
						<Account user={data.user} />
					</Route>
					<Route exact path="/group/create">
						<CreateGroup refetch={refetch} />
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
