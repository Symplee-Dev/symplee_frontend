import { UISelectors } from '../../../redux/selectors';
import { useChatHandler } from '../../../hooks/useChatHandler';

const Messages = () => {
	const currentChat = UISelectors.useSelectCurrentChat();

	useChatHandler(currentChat?.id);

	return <div className="messages">Messages</div>;
};

export default Messages;
