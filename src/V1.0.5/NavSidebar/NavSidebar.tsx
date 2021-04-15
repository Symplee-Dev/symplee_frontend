import {
	faBell,
	faComment,
	faGlobeAmericas,
	faQuestionCircle,
	faSearch,
	faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavSidebar.scss';
import { useState } from 'react';
import { Avatar } from '../components';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';

import NotificationPopout from './NotificationPopout';
import UserPopout from './UserPopout';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

export const NavSidebar = () => {
	const [hasTeams] = useState(false);
	const path = useLocation().pathname;
	const user = useSelector((state: RootState) => state.user.user)!;

	const [notifAnchor, setNotifAnchor] = useState<any | null>(null);
	const [userAnchor, setUserAnchor] = useState<any | null>(null);

	const history = useHistory();

	if (!user) return null;

	return (
		<div className="nav-sidebar">
			<div className="top">
				<FontAwesomeIcon icon={faSearch} className="icon" />
				<hr />
				<FontAwesomeIcon
					onClick={() => history.push('/')}
					icon={faInbox}
					className={`icon ${path === '/' ? 'active' : ''}`}
				/>
				<FontAwesomeIcon
					onClick={() => {
						const lastChatId =
							localStorage.getItem('LAST_SELECTED_GROUP') ??
							user.chatGroups[0].id;
						history.push(`/chat/${lastChatId}`);
					}}
					icon={faComment}
					className={`icon ${path.includes('chat') ? 'active' : ''}`}
				/>
				<FontAwesomeIcon
					icon={faUserFriends}
					className={`icon ${path.includes('teams') ? 'active' : ''}`}
				/>
				<FontAwesomeIcon
					icon={faGlobeAmericas}
					className={`icon ${path.includes('discover') ? 'active' : ''}`}
				/>
				{hasTeams && <hr />}
			</div>
			<div className="bottom">
				<FontAwesomeIcon icon={faQuestionCircle} className="icon" />
				<FontAwesomeIcon
					icon={faBell}
					className="icon"
					onClick={e => setNotifAnchor(e.currentTarget)}
				/>
				<div
					onClick={e => setUserAnchor(e.currentTarget)}
					className="avatar-btn"
				>
					<Avatar
						fallback={user.name[0]}
						hasStatus={true}
						src={user.avatar ?? ''}
					/>
				</div>
				<UserPopout anchor={userAnchor} setAnchor={setUserAnchor} />
				<NotificationPopout anchor={notifAnchor} setAnchor={setNotifAnchor} />
			</div>
		</div>
	);
};
