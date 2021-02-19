import Sidebar from './SideBar';
import './index.scss';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';

import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';
import { useUserLazyQuery } from '../graphql';
import CreateGroup from './views/CreateGroup';
import { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { SET_USER_ID, SET_LOGGED_IN } from '../redux/actions/index';
import { useSelectAuth } from '../redux/selectors';

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	const dispatch = useDispatch();

	const authenticated = useSelectAuth();

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const [user, setUser] = useState<{
		username: string;
		name: string;
		id: number;
		email: string;
		key: string;
		createdAt: string;
		verified: boolean;
		chatGroups: { name: string; id: number }[];
	}>();

	const [fetchUser, { data, loading, error, refetch }] = useUserLazyQuery({
		variables: { id: userId },
		fetchPolicy: 'cache-first'
	});

	if (error) {
		if (refetch) {
			refetch({ id: userId });
		}
	}

	useEffect(() => {
		if (!user) {
			fetchUser();
			setUser(data?.user);
		}
	}, [data, fetchUser, user]);

	useEffect(() => {
		if (authenticated !== undefined && authenticated === false) {
			const token = localStorage.getItem('bolttoken');

			if (token && token.length > 0) {
				const user: { userId: number; username: string } = decode(
					token ?? ''
				);
				console.log(user);
				dispatch({
					type: SET_USER_ID,
					payload: { userId: user.userId }
				});
				dispatch({ type: SET_LOGGED_IN, payload: token });
			}
		}
	}, [dispatch, data, user, authenticated]);

	if (loading) return <CircularProgress color="primary" />;

	if (!loading && data && data.user && refetch && user) {
		return (
			<div className="home-app">
				<Sidebar chatGroups={user.chatGroups} />
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
