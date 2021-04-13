import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../../components/Avatar';
import './style.scss';
import { useState } from 'react';
import ChatGroupInfoSwitch from '../ChatGroupInfoSwitch/ChatGroupInfoSwitch';

const ChatGroupInfoBar = () => {
	const [anchor, setAnchor] = useState<any | null>(null);

	return (
		<div className="chat-group-info-bar">
			<Avatar fallback={'S'} hasStatus={false} src={''} className="large" />
			<h4>Symplee Dev</h4>
			<FontAwesomeIcon
				icon={faChevronDown}
				className="down"
				onClick={e => setAnchor(e.currentTarget)}
			/>
			<ChatGroupInfoSwitch anchor={anchor} setAnchor={setAnchor} />
		</div>
	);
};

export default ChatGroupInfoBar;
