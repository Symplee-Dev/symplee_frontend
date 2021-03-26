import {
	faBell,
	faComment,
	faGlobeAmericas,
	faQuestionCircle,
	faSearch,
	faThLarge,
	faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavSidebar.scss';
import { useState } from 'react';
import { Avatar } from '../components';

export const NavSidebar = () => {
	const [hasTeams] = useState(false);

	return (
		<div className="nav-sidebar">
			<div className="top">
				<FontAwesomeIcon icon={faSearch} className="icon" />
				<hr />
				<FontAwesomeIcon icon={faThLarge} className="icon" />
				<FontAwesomeIcon icon={faComment} className="icon" />
				<FontAwesomeIcon icon={faUserFriends} className="icon" />
				<FontAwesomeIcon icon={faGlobeAmericas} className="icon" />
				{hasTeams && <hr />}
			</div>
			<div className="bottom">
				<FontAwesomeIcon icon={faQuestionCircle} className="icon" />
				<FontAwesomeIcon icon={faBell} className="icon" />
				<Avatar fallback="NR" hasStatus={true} src="" />
			</div>
		</div>
	);
};
