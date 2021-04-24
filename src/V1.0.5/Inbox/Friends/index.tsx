import './style.scss';

import Recents from './Recents';
import FriendsList from './FriendsList';

const Friends = () => {
	return (
		<div className="friends">
			<Recents />
			<FriendsList />
		</div>
	);
};

export default Friends;
