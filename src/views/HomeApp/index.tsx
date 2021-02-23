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

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	const userId = UserSelectors.useSelectUserId();
	const setUserId = UserActions.useSetUserId();

	// todo: extract to redux value
	const [hasLatestChangeLog, setHasLatestChangelog] = useState({
		value: false,
		dateSet: new Date().toString()
	});

	const [
		getChangeLog,
		{ data: changeLog, loading: changeLogLoading }
	] = useChangeLogsLazyQuery({
		fetchPolicy: 'cache-first'
	});

	const [currentLog, setCurrentLog] = useState<
		| { id: number; body: string; changes: string[]; version: string }
		| undefined
	>();

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

	const [changeLogOpen, setChangeLogOpen] = useState(false);
	const [changeLogOpened, setChangeLogOpened] = useState(false);

	// Todo: extract into util
	useEffect(() => {
		if (!hasLatestChangeLog.value && !changeLogLoading) {
			if (changeLog) {
				const storedChangelog = window.localStorage.getItem(
					'bolt_changelog'
				);

				if (storedChangelog) {
					// parse the stored changelog
					const parsed: { id: number; version: string } = JSON.parse(
						storedChangelog
					);

					// find one with a newer id if any
					const newest = changeLog.changeLogs.find(
						log => log.id === parsed.id + 1
					);

					if (newest) {
						// if new version set new changelog to local storage
						localStorage.setItem(
							'bolt_changelog',
							JSON.stringify({
								id: newest.id,
								version: newest.version
							})
						);
						setHasLatestChangelog({
							value: true,
							dateSet: new Date().toString()
						});
						setCurrentLog(newest);
					} else {
						console.log('Has latest');
						setHasLatestChangelog({
							value: true,
							dateSet: new Date().toString()
						});
						const newest = changeLog.changeLogs.find(
							log => log.id === parsed.id
						);
						setChangeLogOpened(true);

						setCurrentLog(newest);
					}
				} else {
					const newest = changeLog.changeLogs.reduce(function (
						prev,
						current
					) {
						if (+current.id > +prev.id) {
							return current;
						} else {
							return prev;
						}
					});

					// fetch because none exists yet
					localStorage.setItem(
						'bolt_changelog',
						JSON.stringify({
							id: newest.id,
							version: newest.version
						})
					);

					setCurrentLog(newest);
				}
				setHasLatestChangelog({
					value: true,
					dateSet: new Date().toString()
				});
			} else {
				// fetch data because no data yet
				getChangeLog();
			}
		}

		if (
			hasLatestChangeLog.value === true &&
			hasLatestChangeLog.dateSet === new Date().toString() &&
			!changeLogOpened
		) {
			// set modal open
			setChangeLogOpen(true);
			setChangeLogOpened(true);
		}
	}, [
		changeLog,
		getChangeLog,
		hasLatestChangeLog,
		changeLogOpened,
		changeLogLoading
	]);

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
		console.log(data, user);
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
