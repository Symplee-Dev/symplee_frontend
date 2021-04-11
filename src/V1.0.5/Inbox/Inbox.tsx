import './style.scss';
import InboxSidebar from './InboxSidebar';
import { Switch, Route } from 'react-router-dom';

import Friends from './Friends';

export const Inbox = () => {
	return (
		<div className="inbox">
			<InboxSidebar />
			<Switch>
				<Route exact path="/">
					<Friends />
				</Route>
			</Switch>
		</div>
	);
};

export default Inbox;
