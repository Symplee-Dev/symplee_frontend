import { Maybe } from '../../../../graphql';
import { useReactPath } from '../../../../hooks/useReactPath';
import { useHistory } from 'react-router';
import { UISelectors } from '../../../../redux/selectors';

interface ChatGroupSidebarChatProps {
	chat: Maybe<{
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
		mode?: string;
	}>;
	onClick: () => void;
}

const ChatGroupSidebarChat = ({ chat, onClick }: ChatGroupSidebarChatProps) => {
	const path = useReactPath();

	const history = useHistory();

	const group = UISelectors.useSelectCurrentChatGroup();

	if (!chat) return null;

	return (
		<div
			onClick={() => {
				onClick();
				history.push('/group/' + group?.id + '/chat/' + chat.id);
			}}
			className={`sidebar-chat ${
				path.includes('/chat/' + chat.id) && 'sidebar-chat-active'
			}`}
		>
			<div className="chat-top">
				{chat.icon}
				<p>#{chat.name}</p>
			</div>
			{chat.mode === 'text chat' ? (
				<p className="label">Text Channel</p>
			) : (
				<p className="label">Voice And Video</p>
			)}
		</div>
	);
};

export default ChatGroupSidebarChat;
