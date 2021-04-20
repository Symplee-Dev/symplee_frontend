import { UIActions } from '../../../redux/actions/index';
import './style.scss';

import TextChat from './TextChat';
import { useParams } from 'react-router-dom';
import { UISelectors } from '../../../redux/selectors';
import ChannelInfo from './ChannelInfo/ChannelInfo';
import { useState } from 'react';

const Channel = () => {
	const { chatId }: { chatId: string } = useParams();
	const setCurrentChat = UIActions.useSetCurrentChat();

	const [channelInfoOpen, setChannelInfoOpen] = useState(false);

	setCurrentChat(
		UISelectors.useSelectCurrentChatGroup()?.chats.find(
			c => c?.id === parseInt(chatId)
		)
	);

	return (
		<div className="channel">
			<TextChat
				setChannelInfoOpen={setChannelInfoOpen}
				channelInfoOpen={channelInfoOpen}
			/>
			{channelInfoOpen && (
				<ChannelInfo setChannelInfoOpen={setChannelInfoOpen} />
			)}
		</div>
	);
};

export default Channel;
