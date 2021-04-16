import './TextChat.scss';
import ChatHeader from './ChatHeader';
import { TextInput } from '../../components';
import { useState } from 'react';
import Messages from './Messages';

const TextChat = () => {
	const [newMessage, setNewMessage] = useState('');

	return (
		<div className="text-chat">
			<ChatHeader />
			<div className="chat">
				<Messages />

				<div className="input-text">
					<TextInput
						placeHolder="Start the conversation"
						value={newMessage}
						setValue={e => setNewMessage(e.target.value)}
						type="chat"
					/>
				</div>
			</div>
		</div>
	);
};

export default TextChat;
