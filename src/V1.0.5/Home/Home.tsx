import './Home.scss';
import { NavSidebar } from '../NavSidebar/NavSidebar';
import { Route, Switch } from 'react-router';
import { Modal } from '@material-ui/core';

import { Inbox } from '../Inbox';
import Chat from '../Chat/index';
import Channel from '../Chat/Channel';
import { UISelectors } from '../../redux/selectors';
import Discover from '../Discover/index';
import ModalContainer from '../components/ModalContainer';
import { UIActions } from '../../redux/actions';

export const Home = ({ isElectron }: { isElectron: boolean }) => {
	// const hasSelectedChat = UISelectors.useSelectCurrentChat();
	const modalStatus = UISelectors.useSelectModalStatus();
	const closeModal = UIActions.useSetModalStatus(false);

	return (
		<div className="home" style={{ height: isElectron ? '98vh' : '100vh' }}>
			<div className={`layout ${isElectron ? '' : 'layout-max'}`}>
				<NavSidebar />
				<Switch>
					<Route exact path="/discover">
						<Discover />
					</Route>
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
				<Modal
					open={modalStatus}
					onClose={() => {
						closeModal();
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<ModalContainer></ModalContainer>
				</Modal>
			</div>
		</div>
	);
};
