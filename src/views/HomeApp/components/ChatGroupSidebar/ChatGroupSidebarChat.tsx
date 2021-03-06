import { Maybe } from '../../../../graphql';
import { Avatar } from '@material-ui/core';
import { useReactPath } from '../../../../hooks/useReactPath';
import { useHistory } from 'react-router';
import { UISelectors } from '../../../../redux/selectors';

interface ChatGroupSidebarChatProps {
	chat: Maybe<{
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
	}>;
}

const ChatGroupSidebarChat = ({ chat }: ChatGroupSidebarChatProps) => {
	const path = useReactPath();

	const history = useHistory();

	const group = UISelectors.useSelectCurrentChatGroup();

	if (!chat) return null;

	console.log(path);
	return (
		<div
			onClick={() =>
				history.push('/group/' + group?.id + '/chat/' + chat.id)
			}
			className={`sidebar-chat ${
				path.includes('/chat/' + chat.id) && 'sidebar-chat-active'
			}`}
		>
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
