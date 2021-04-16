import './TextChat.scss';
import ChatHeader from './ChatHeader';
import { TextInput } from '../../components';
import Messages from './Messages';
import { useChatHandler } from '../../../hooks/useChatHandler';
import { UISelectors } from '../../../redux/selectors';

const TextChat = () => {
	const currentChat = UISelectors.useSelectCurrentChat();

	const [
		loading,
		whosTyping,
		formState,
		setFormState,
		messages,
		handleSend,
		handleSendTyping,
		end,
		setEnd,
		firstLoad,
		setFirstLoad
	] = useChatHandler(currentChat?.id);

	return (
		<div className="text-chat">
			<ChatHeader />
			<div className="chat">
				{!loading && (
					<Messages
						messages={messages}
						setEnd={setEnd}
						end={end}
						firstLoad={firstLoad}
						setFirstLoad={setFirstLoad}
					/>
				)}

				<div className="input-text">
					<TextInput
						placeHolder="Start the conversation"
						value={formState}
						setValue={e => setFormState(e.target.value)}
						type="chat"
					/>
				</div>
			</div>
		</div>
	);
};

export default TextChat;
