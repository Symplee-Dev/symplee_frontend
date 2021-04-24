import { Avatar } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';
import { Button } from '../components';
import Moment from 'react-moment';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReactPath } from '../../hooks/useReactPath';
import EmptyInbox from './EmptyInbox';

const InboxSidebar = () => {
	const path = useReactPath();
	const user = useSelector((state: RootState) => state.user.user)!;

	if (!user) {
		return null;
	}

	return (
		<div className="inbox-sidebar">
			<div className="user-card">
				<Avatar
					src={user.avatar ?? ''}
					fallback={user.name[0]}
					hasStatus={true}
					className="large"
				/>
				<h4>
					{user.username}#{user.key}
				</h4>
				<p className="subtitle">{user.name}</p>

				<p className="subtitle">
					Joined <Moment fromNow>{user.createdAt}</Moment>
				</p>
				<Button
					clickHandler={() => alert('Not implemented')}
					content="Update"
					size="large"
				/>
			</div>
			<div className={`friends-btn ${path === '/' && 'active'}`}>
				<h4>View Friends</h4>
				<FontAwesomeIcon icon={faUserFriends} />
			</div>
			<div className="dm-list dm-list-empty">
				<EmptyInbox />
				<p>Your Inbox Is Empty Right Now</p>
				<Button
					clickHandler={() => alert('Not implemented')}
					content="Start Messaging"
					size="large"
				/>
			</div>
		</div>
	);
};

export default InboxSidebar;
