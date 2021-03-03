import './styles.scss';
import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useMessageSentSubscription,
	Maybe
} from '../../../../graphql';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import { useParams } from 'react-router-dom';
import Message from './Message';
import NewChatBar from './NewChatBar';

const Chat = () => {
	const params: { chatGroupId: string; chatId: string } = useParams();

	useMessageSentSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData(data) {
			console.log('received');
			if (data.subscriptionData.data?.messageSent)
				setMessages([
					...messages,
					data.subscriptionData.data?.messageSent
				]);
		}
	});

	const user = useSelector((state: RootState) => state.user.user!);

	const [formState, setFormState] = useState('');

	const [sendMessage] = useSendMessageMutation();

	const [messages, setMessages] = useState<
		Maybe<{
			id: number;
			body: string;
			createdAt: string;
			author: {
				id: number;
				username: string;
				avatar?: string;
			};
		}>[]
	>([]);

	const handleSend = e => {
		e.preventDefault();

		const chat = {
			authorId: user.id,
			authorUsername: user.username,
			body: formState,
			chatId: Number(params.chatId)
		};

		sendMessage({
			variables: { message: chat }
		});

		console.log('sending');

		setFormState('');
	};

	const { data, loading } = useGetMessagesQuery({
		variables: { chatId: Number(params.chatId) },
		onCompleted() {
			if (data) setMessages(data.getMessages);
		},
		nextFetchPolicy: 'network-only',
		fetchPolicy: 'network-only'
	});

	return (
		<div className="chat-group-chats">
			<div className="chats">
				{messages.map((message, key) => (
					<Message message={message} key={key} />
				))}
			</div>
			<NewChatBar />
		</div>
	);
};

export default Chat;
