import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../../components/Avatar';
import './style.scss';
import { useState } from 'react';
import ChatGroupInfoSwitch from '../ChatGroupInfoSwitch/ChatGroupInfoSwitch';
import { UISelectors } from '../../../redux/selectors';
import { UIActions } from '../../../redux/actions';

type ChatGroupInfoBarProps = {
	name: string;
	avatar?: string;
};

const ChatGroupInfoBar = ({ name, avatar }: ChatGroupInfoBarProps) => {
	const [anchor, setAnchor] = useState<any | null>(null);

	const currentGroup = UISelectors.useSelectCurrentChatGroup();
	const setCurrentChat = UIActions.useSetCurrentChat();

	// setCurrentChat(currentGroup?.chats[0]);

	return (
		<div className="chat-group-info-bar">
			<div className="left">
				<Avatar
					fallback={name[0]}
					hasStatus={false}
					src={avatar ?? ''}
					className="medium"
				/>
				<h4>{name}</h4>
			</div>
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
