import './style.scss';
import InboxSidebar from './InboxSidebar';
import { Switch, Route } from 'react-router-dom';

import Friends from './Friends';
import DMView from './DM/DMView';

export const Inbox = () => {
	return (
		<div className="inbox">
			<InboxSidebar />
			<Switch>
				<Route exact path="/dm/:chatId">
					<DMView />
				</Route>
				<Route exact path="/">
					<Friends />
				</Route>
			</Switch>
		</div>
	);
};

export default Inbox;
