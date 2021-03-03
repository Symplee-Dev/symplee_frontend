import { Maybe } from '../../../../graphql';
import { Avatar } from '@material-ui/core';

interface ChatGroupSidebarChatProps {
	chat: Maybe<{
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
	}>;
}

const ChatGroupSidebarChat = ({ chat }: ChatGroupSidebarChatProps) => {
	if (!chat) return null;

	return (
		<div className="sidebar-chat">
			<div className="chat-top">
				<Avatar
					style={{
						background: 'gray',
						width: '25px',
						height: '25px',
						fontSize: '1rem'
					}}
					alt={chat.name}
				>
					{chat.icon}
				</Avatar>
				<p>#{chat.name}</p>
			</div>
			<p className="label">Text Channel</p>
		</div>
	);
};

export default ChatGroupSidebarChat;
