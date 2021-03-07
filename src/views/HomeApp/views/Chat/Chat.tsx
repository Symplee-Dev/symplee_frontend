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
import { UIActions } from '../../../../redux/actions/index';
import noMessages from '../../../../assets/no_messages.svg';
import { CircularProgress } from '@material-ui/core';

const Chat = () => {
	const params: { chatGroupId: string; chatId: string } = useParams();

	const thisChat = useSelector((state: RootState) =>
		state.ui.currentChatGroup?.chats.find(
			chat => chat?.id === Number(params.chatId)
		)
	);

	const setCurrentChat = UIActions.useSetCurrentChat();

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

	const [firstLoad, setFirstLoad] = useState(true);

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
			setCurrentChat(thisChat);
		},
		nextFetchPolicy: 'network-only',
		fetchPolicy: 'network-only'
	});

	useEffect(() => {
		if (end && firstLoad) {
			end.scrollIntoView({ behavior: 'auto' });
			setFirstLoad(false);
			return;
		}
		if (end) {
			end.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, end, firstLoad]);

	if (messages.length < 1 && !data) {
		return (
			<div className="chat-group-chats">
				<p className="chat-title">#{thisChat?.name}</p>
				<div className="no-message">
					<CircularProgress />
				</div>
			</div>
		);
	}

	return (
		<div className="chat-group-chats">
			<p className="chat-title">#{thisChat?.name}</p>
			<div className="chats">
				{messages.map((message, key) => (
					<Message
						message={message}
						key={key}
						noHeader={
							messages[key - 1]?.author.id === message?.author.id
						}
					/>
				))}
				<span
					ref={el => {
						setEnd(el);
					}}
				></span>
				{messages.length < 1 && (
					<div className="no-messages">
						<h3>There's Nothing Here</h3>
						<p>Be the first to send a message.</p>
						<img src={noMessages} alt="no messages baloons" />
					</div>
				)}
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
