// import Sidebar from './SideBar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Switch, useLocation } from 'react-router';
// import HomeAppRoot from './views/HomeAppRoot';
import { CircularProgress } from '@material-ui/core';
import Account from '../Account/Account';
import {
	// useChangeLogsLazyQuery,
	useToggleUserOnlineMutation
} from '../../graphql';
// import CreateGroup from './views/CreateGroup';
// import ChangeLogModal from './ChangeLogModal';
// import { useChangeLog } from '../../hooks/useChangeLog';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';
import { UserActions, UIActions } from '../../redux/actions/index';
import ChatGroupSidebar from './components/ChatGroupSidebar/ChatGroupSidebar';
import Chat from './views/Chat/Chat';
import './index.scss';

import ChatGroupIndex from './views/ChatGroup/index';
import SidebarFooter from './components/SidebarFooter/SidebarFooter';
import ChatMembersBar from './components/ChatMembers/ChatMembersBar';
import { UISelectors } from '../../redux/selectors';
import { useState } from 'react';
import NewGroupModal from './components/NewGroup/NewGroupModal';
import SendInviteModal from './components/SendInviteModal/SendInviteModal';
import Dashbaord from './views/Dashboard/Dashboard';
import DashboardSidebar from './components/DashboardSidebar/DashboardSidebar';
import PublicProfileSidebar from './views/PublicProfile/PublicProfileSidebar';
import PublicProfile from './views/PublicProfile/PublicProfile';
import Discover from './views/Discover/Discover';
import Messages from './views/Dashboard/Messages';
import { useScroll } from '../../hooks/useKeepInView';
import { Maybe } from '../../graphql';

const HomeApp = ({
	chatGroups
}: {
	chatGroups: {
		name: string;
		id: number;
		avatar?: Maybe<string>;
	}[];
}) => {
	// remove padding for home app
	document.body.classList.add('body-app');

	const [toggleOnline] = useToggleUserOnlineMutation();

	const location = useLocation();

	UserActions.useGetUser();

	window.addEventListener('load', () => {
		toggleOnline({
			variables: {
				status: true
			}
		});
	});
	window.addEventListener('beforeunload', () => toggleOnline());

	const user = useSelector((state: RootState) => state.user.user);
	const hasCurrentGroup = UISelectors.useSelectCurrentChatGroup();

	const [creatingGroup, setCreatingGroup] = useState(false);
	const [creatingInvite, setCreatingInvite] = useState(false);
	const setDashboardRoute = UIActions.useSetDashboardRoute();
	const dashboardRoute = UISelectors.useSelectDashboardRoute();
	// const [
	// 	getChangeLog,
	// 	{ data: changeLog, loading: changeLogLoading }
	// ] = useChangeLogsLazyQuery({
	// 	fetchPolicy: 'cache-first'
	// });

	// const { changeLogOpen, currentLog, setChangeLogOpen } = useChangeLog({
	// 	getChangeLog,
	// 	changeLog,
	// 	changeLogLoading
	// });

	if (!user) return <CircularProgress color="primary" />;

	if (user) {
		return (
			<div className="home-app">
				{/* <Sidebar chatGroups={user.chatGroups} /> */}
				{creatingGroup && (
					<NewGroupModal
						open={creatingGroup}
						setOpen={setCreatingGroup}
					/>
				)}
				{creatingInvite && (
					<SendInviteModal
						open={creatingInvite}
						setOpen={setCreatingInvite}
					/>
				)}
				<div className="sidebar-footer-container">
					<div className="top">
						<Sidebar setCreatingGroup={setCreatingGroup} />
						{location.pathname.includes('/group/') &&
							hasCurrentGroup && (
								<ChatGroupSidebar
									setCreatingInvite={setCreatingInvite}
								/>
							)}
						{(location.pathname === '/' ||
							location.pathname.includes('/discover') ||
							location.pathname.includes('/dm')) && (
							<DashboardSidebar
								route={dashboardRoute}
								setRoute={setDashboardRoute}
							/>
						)}

						{location.pathname.includes('/user/profile/') && (
							<PublicProfileSidebar
								setDashboardRoute={setDashboardRoute}
							/>
						)}
					</div>
					<SidebarFooter />
				</div>
				<Switch location={location}>
					<Route exact path="/group/:groupId">
						<ChatGroupIndex authorId={user.id} />
					</Route>
					<Route exact path="/you">
						<Account user={user} />
					</Route>
					{/* 
					<Route exact path="/group/create">
						<CreateGroup />
					</Route>
		

					<Route exact path="/group/:groupId/chat/:chatId">
						<ChatView />
					</Route> */}
					<Route exact path="/discover">
						<Discover />
					</Route>
					<Route exact path="/dm">
						<div style={{ height: '100vh' }}>
							<Messages />
						</div>
					</Route>
					<Route exact path="/dm/:groupId/message/:chatId">
						<div
							style={{
								height: '100vh'
							}}
						>
							<Messages />
						</div>
						<Chat isDm={true} />
						<ChatMembersBar />
					</Route>
					<Route exact path="/user/profile/:id">
						<PublicProfile />
					</Route>
					<Route exact path="/group/:groupId/chat/:chatId">
						<ChatGroupIndex authorId={user.id} />

						<Chat />
						<ChatMembersBar />
					</Route>
					<Route exact path="/">
						<Dashbaord route={dashboardRoute} />
					</Route>
				</Switch>
				{/* {changeLogOpen && currentLog && (
					<ChangeLogModal
						open={changeLogOpen}
						setOpen={setChangeLogOpen}
						changeLog={currentLog}
					/>
				)} */}
			</div>
		);
	}

	return null;
};

export default HomeApp;
