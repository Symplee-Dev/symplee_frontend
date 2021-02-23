import Sidebar from './SideBar';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';
import { useChangeLogsLazyQuery, useUserLazyQuery } from '../../graphql';
import CreateGroup from './views/CreateGroup';
import { useEffect, useState, useMemo } from 'react';
import decode from 'jwt-decode';
import ChatGroupIndex from './views/ChatGroupView/index';
import ChangeLogModal from './ChangeLogModal';
import { UserSelectors } from '../../redux/selectors';
import { UserActions } from '../../redux/actions/index';
import { useChangeLog } from '../../hooks/useChangeLog';

const HomeApp = () => {
	// remove padding for home app
	document.body.classList.add('body-app');

	const location = useLocation();

	const userId = UserSelectors.useSelectUserId();
	const setUserId = UserActions.useSetUserId();

	const [
		getChangeLog,
		{ data: changeLog, loading: changeLogLoading }
	] = useChangeLogsLazyQuery({
		fetchPolicy: 'cache-first'
	});

	const { changeLogOpen, currentLog, setChangeLogOpen } = useChangeLog({
		getChangeLog,
		changeLog,
		changeLogLoading
	});

	const [user, setUser] = useState<{
		username: string;
		name: string;
		id: number;
		email: string;
		avatar?: string;
		key: string;
		createdAt: string;
		verified: boolean;
		chatGroups: { name: string; id: number }[];
	}>();

	const [fetchUser, { data, loading, error, refetch }] = useUserLazyQuery({
		variables: { id: userId! },
		fetchPolicy: 'cache-first'
	});

	useMemo(() => {
		if (!user) {
			fetchUser();
			setUser(data?.user);
		}
	}, [data, fetchUser, user]);

	useEffect(() => {
		if (error) {
			if (refetch) {
				refetch({ id: user?.id });
			}
		}
	}, [error, refetch, user?.id]);

	useMemo(() => {
		if (!user && !data) {
			const token = localStorage.getItem('bolttoken');

			if (token && token.length > 0) {
				const tokenUser: { userId: number; username: string } = decode(
					token ?? ''
				);

				if (tokenUser.userId) {
					setUserId(tokenUser.userId);
				}
			}
		}
	}, [user, data, setUserId]);

	if (loading) return <CircularProgress color="primary" />;

	if (!loading && data && data.user && refetch && user) {
		return (
			<div className="home-app">
				<Sidebar chatGroups={user.chatGroups} />
				<Switch location={location}>
					<Route exact path="/you">
						<Account user={data.user} refetch={refetch} />
					</Route>
					<Route exact path="/group/create">
						<CreateGroup refetch={refetch} />
					</Route>
					<Route exact path="/group/:id">
						<ChatGroupIndex authorId={data.user.id} />
					</Route>
					<Route exact path="/">
						<HomeAppRoot user={data.user} />
					</Route>
				</Switch>
				{changeLogOpen && currentLog && (
					<ChangeLogModal
						open={changeLogOpen}
						setOpen={setChangeLogOpen}
						changeLog={currentLog}
					/>
				)}
			</div>
		);
	}

	return null;
};

export default HomeApp;
