import './styles.scss';
import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useMessageSentSubscription,
	Maybe
} from '../../../../graphql';
import { useState, useEffect } from 'react';
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

	const [end, setEnd] = useState<HTMLSpanElement | null>(null);

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

		if (formState.length <= 0) {
			return;
		}

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

	const { data } = useGetMessagesQuery({
		variables: { chatId: Number(params.chatId) },
		onCompleted() {
			if (data) setMessages(data.getMessages);
		},
		nextFetchPolicy: 'network-only',
		fetchPolicy: 'network-only'
	});

	useEffect(() => {
		if (end) {
			end.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, end]);

	return (
		<div className="chat-group-chats">
			<div className="chats">
				{messages.map((message, key) => (
					<Message message={message} key={key} />
				))}
				<span
					ref={el => {
						setEnd(el);
					}}
				></span>
			</div>
			<NewChatBar
				handleSubmit={handleSend}
				formState={formState}
				setFormState={setFormState}
			/>
		</div>
	);
};

export default Chat;
