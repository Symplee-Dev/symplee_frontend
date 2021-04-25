import './Home.scss';
import { NavSidebar } from '../NavSidebar/NavSidebar';
import { Route, Switch } from 'react-router';

import { Inbox } from '../Inbox';
import Chat from '../Chat/index';
import Channel from '../Chat/Channel';
import { UISelectors } from '../../redux/selectors';

export const Home = ({ isElectron }: { isElectron: boolean }) => {
	const hasSelectedChat = UISelectors.useSelectCurrentChat();

	return (
		<div className="home" style={{ height: isElectron ? '98vh' : '100vh' }}>
			<div className={`layout ${isElectron ? '' : 'layout-max'}`}>
				<NavSidebar />
				<Switch>
					<Route exact path={`/chat/:lastchatid`}>
						<div className="chat-parent">
							<Chat />
							<div className="chat-empty">
								{/* <EmptyChatArt /> */}
								<p>Please select a channel</p>
							</div>
						</div>
					</Route>
					<Route exact path={`/chat/:lastchatid/message/:chatId`}>
						<Chat />
						<Channel />
					</Route>
					<Route exact path="/">
						<Inbox />
					</Route>
				</Switch>
			</div>
		</div>
	);
};
