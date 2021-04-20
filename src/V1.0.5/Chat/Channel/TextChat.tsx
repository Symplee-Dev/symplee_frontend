import './TextChat.scss';
import ChatHeader from './ChatHeader';
import { TextInput } from '../../components';
import Messages from './Messages';
import { useChatHandler } from '../../../hooks/useChatHandler';
import { UISelectors } from '../../../redux/selectors';

const TextChat = ({
	setChannelInfoOpen,
	channelInfoOpen
}: {
	channelInfoOpen: boolean;
	setChannelInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
			<ChatHeader
				setChannelInfoOpen={setChannelInfoOpen}
				channelInfoOpen={channelInfoOpen}
			/>
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

				<form className="input-text" onSubmit={e => handleSend(e)}>
					<TextInput
						placeHolder="Start the conversation"
						value={formState}
						setValue={e => setFormState(e.target.value)}
						type="chat"
					/>
				</form>
			</div>
		</div>
	);
};

export default TextChat;
