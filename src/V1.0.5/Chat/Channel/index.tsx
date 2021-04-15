import { UIActions } from '../../../redux/actions/index';
import './style.scss';

import TextChat from './TextChat';
import { useParams } from 'react-router-dom';
import { UISelectors } from '../../../redux/selectors';

const Channel = () => {
	const { chatId }: { chatId: string } = useParams();
	const setCurrentChat = UIActions.useSetCurrentChat();

	setCurrentChat(
		UISelectors.useSelectCurrentChatGroup()?.chats.find(
			c => c?.id === parseInt(chatId)
		)
	);

	return (
		<div className="channel">
			<TextChat />
		</div>
	);
};

export default Channel;
