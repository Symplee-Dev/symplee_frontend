import './Home.scss';
import { NavSidebar } from '../NavSidebar/NavSidebar';
import { Route, Switch } from 'react-router';

import { Inbox } from '../Inbox';
import Chat from '../Chat/index';

export const Home = ({ isElectron }: { isElectron: boolean }) => {
	return (
		<div className="home" style={{ height: isElectron ? '98vh' : '100vh' }}>
			<div className={`layout ${isElectron ? '' : 'layout-max'}`}>
				<NavSidebar />
				<Switch>
					<Route path={`/chat/:lastchatid`}>
						<Chat />
					</Route>
					<Route exact path="/">
						<Inbox />
					</Route>
				</Switch>
			</div>
		</div>
	);
};
