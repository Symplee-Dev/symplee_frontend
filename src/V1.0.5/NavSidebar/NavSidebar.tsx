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
import { useReactPath } from '../../hooks/useReactPath';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';

import NotificationPopout from './NotificationPopout';

export const NavSidebar = () => {
	const [hasTeams] = useState(false);
	const path = useReactPath();
	const user = useSelector((state: RootState) => state.user.user)!;
	const [notifAnchor, setNotifAnchor] = useState<any | null>(null);

	if (!user) return null;

	return (
		<div className="nav-sidebar">
			<div className="top">
				<FontAwesomeIcon icon={faSearch} className="icon" />
				<hr />
				<FontAwesomeIcon
					icon={faInbox}
					className={`icon ${path === '/' ? 'active' : ''}`}
				/>
				<FontAwesomeIcon
					icon={faComment}
					className={`icon ${
						path.includes('groups') ? 'active' : ''
					}`}
				/>
				<FontAwesomeIcon
					icon={faUserFriends}
					className={`icon ${path.includes('teams') ? 'active' : ''}`}
				/>
				<FontAwesomeIcon
					icon={faGlobeAmericas}
					className={`icon ${
						path.includes('discover') ? 'active' : ''
					}`}
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
				<Avatar
					fallback={user.name[0]}
					hasStatus={true}
					src={user.avatar ?? ''}
				/>
				<NotificationPopout
					anchor={notifAnchor}
					setAnchor={setNotifAnchor}
				/>
			</div>
		</div>
	);
};
