import { UIActions } from '../../../redux/actions/index';
import './style.scss';

import TextChat from './TextChat';
import { useParams } from 'react-router-dom';
import { UISelectors } from '../../../redux/selectors';
import ChannelInfo from './ChannelInfo/ChannelInfo';
import { useState } from 'react';
import VideoChannel from './VideoChannel/index';

const Channel = () => {
	const { chatId }: { chatId: string } = useParams();
	const setCurrentChat = UIActions.useSetCurrentChat();
	const currentChat = UISelectors.useSelectCurrentChatGroup()?.chats.find(
		c => c?.id === parseInt(chatId)
	);

	const [channelInfoOpen, setChannelInfoOpen] = useState(false);

	setCurrentChat(currentChat);

	return (
		<div className="channel">
			{currentChat?.mode === 'text chat' ? (
				<TextChat
					setChannelInfoOpen={setChannelInfoOpen}
					channelInfoOpen={channelInfoOpen}
				/>
			) : (
				<VideoChannel />
			)}
			{channelInfoOpen && (
				<ChannelInfo setChannelInfoOpen={setChannelInfoOpen} />
			)}
		</div>
	);
};

export default Channel;
