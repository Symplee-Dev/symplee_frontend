// import Sidebar from './SideBar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';
import { CircularProgress } from '@material-ui/core';
import Account from './views/Account';
import { useChangeLogsLazyQuery } from '../../graphql';
import CreateGroup from './views/CreateGroup';
import ChangeLogModal from './ChangeLogModal';
import { useChangeLog } from '../../hooks/useChangeLog';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';
import { UserActions } from '../../redux/actions/index';
import ChatView from './views/ChatGroupView/ChatView';
import ChatGroupSidebar from './components/ChatGroupSidebar/ChatGroupSidebar';
import './index.scss';

import ChatGroupIndex from './views/ChatGroup/index';

const HomeApp = () => {
	// remove padding for home app
	document.body.classList.add('body-app');

	const location = useLocation();

	UserActions.useGetUser();

	const user = useSelector((state: RootState) => state.user.user);

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
				<div className="sidebar-footer-container">
					<div className="top">
						<Sidebar />
						{location.pathname.includes('/group/') && (
							<ChatGroupSidebar />
						)}
					</div>
				</div>
				<Switch location={location}>
					<Route exact path="/group/:id">
						<ChatGroupIndex authorId={user.id} />
					</Route>
					{/* <Route exact path="/you">
						<Account user={user} />
					</Route>
					<Route exact path="/group/create">
						<CreateGroup />
					</Route>
		

					<Route exact path="/group/:groupId/chat/:chatId">
						<ChatView />
					</Route> */}
					<Route exact path="/">
						{/* <HomeAppRoot user={user} /> */}
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
