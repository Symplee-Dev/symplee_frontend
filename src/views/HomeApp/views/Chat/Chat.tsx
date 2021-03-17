import './styles.scss';
import {
	useGetMessagesQuery,
	useSendMessageMutation,
	useMessageSentSubscription,
	Maybe,
	useGetBlockedFriendsQuery,
	useMessageDeletedSubscription,
	useMessageEditedSubscription
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
import {
	useUserTypingSubscriptionSubscription,
	useSendUserTypingMutation
} from '../../../../graphql';

const Chat = ({ isDm = false }: { isDm?: boolean }) => {
	const params: { chatGroupId: string; chatId: string } = useParams();

	const thisChat = useSelector((state: RootState) =>
		state.ui.currentChatGroup?.chats.find(
			chat => chat?.id === Number(params.chatId)
		)
	);

	const username = useSelector(
		(state: RootState) => state.user.user?.username
	)!;
	const userId = useSelector((state: RootState) => state.user.userId)!;

	const setCurrentChat = UIActions.useSetCurrentChat();
	const { data: blockedFriendsData } = useGetBlockedFriendsQuery({
		variables: { userId }
	});

	useMessageSentSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData: data => {
			console.log('received message');
			if (data.subscriptionData.data?.messageSent)
				if (blockedFriendsData) {
					if (
						blockedFriendsData.getBlockedFriends.find(
							f =>
								f?.friend?.id ===
								data.subscriptionData.data?.messageSent.author
									.id
						) === undefined
					) {
						setMessages([
							...messages,
							data.subscriptionData.data?.messageSent
						]);
					}
				} else {
					setMessages([
						...messages,
						data.subscriptionData.data?.messageSent
					]);
				}
		}
	});

	useMessageEditedSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData: ({ subscriptionData }) => {
			const data = subscriptionData.data;
			if (!!data) {
				setMessages([
					...messages.map(message => {
						return message?.id === data.messageEdited.id
							? { ...message, body: data.messageEdited.body }
							: message;
					})
				]);
			}
		}
	});

	useMessageDeletedSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData: ({ subscriptionData }) => {
			const data = subscriptionData.data;
			if (data) {
				setMessages([
					...messages.filter(
						message => message && message.id !== data.messageDeleted
					)
				]);
			}
		}
	});

	useUserTypingSubscriptionSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData(data) {
			console.log('received typed');
			if (data.subscriptionData.data?.userTyping)
				if (
					whosTyping.find(
						typer =>
							typer.userId ===
							data.subscriptionData.data?.userTyping?.userId
					)
				) {
					if (blockedFriendsData) {
						if (
							blockedFriendsData.getBlockedFriends.find(
								f =>
									f?.friend?.id ===
									data.subscriptionData.data?.userTyping
							) === undefined
						) {
							setWhosTyping([
								...whosTyping.filter(
									typer =>
										typer.userId !==
											data.subscriptionData.data
												?.userTyping?.userId &&
										data.subscriptionData.data?.userTyping
											?.userId !== userId
								)
							]);
						}
					}
				} else {
					data.subscriptionData.data?.userTyping?.userId !== userId &&
						setWhosTyping([
							...whosTyping,
							data.subscriptionData.data.userTyping
						]);
				}
		}
	});

	const [end, setEnd] = useState<HTMLSpanElement | null>(null);

	const user = useSelector((state: RootState) => state.user.user!);

	const [firstLoad, setFirstLoad] = useState(true);

	const [formState, setFormState] = useState('');

	const [sendMessage] = useSendMessageMutation();
	const [sendUserTyping] = useSendUserTypingMutation();

	const [whosTyping, setWhosTyping] = useState<
		{
			userId: number;
			username: string;
		}[]
	>([]);

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

	const handleSendTyping = () => {
		sendUserTyping({
			variables: { chatId: Number(params.chatId), userId, username }
		});
	};

	const { data, refetch } = useGetMessagesQuery({
		variables: { chatId: Number(params.chatId) },
		onCompleted() {
			if (data) {
				setMessages(
					data.getMessages.filter(
						msg =>
							!blockedFriendsData?.getBlockedFriends.find(
								f => f?.friend?.id === msg?.author.id
							)
					)
				);
			}
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
				<>
					{messages.map((message, key) => (
						<Message
							message={message}
							key={key}
							noHeader={
								messages[key - 1]?.author.id ===
								message?.author.id
							}
						/>
					))}
				</>
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
			<div className="whos-typing">
				{whosTyping.length > 0 &&
					whosTyping.length <= 3 &&
					whosTyping.length > 1 && (
						<p className="typer">
							<>
								{whosTyping.map(typer => typer.username + ', ')}{' '}
								is
							</>
							typing
						</p>
					)}
				{whosTyping.length > 0 &&
					whosTyping.length <= 3 &&
					whosTyping.length === 1 && (
						<p className="typer">
							<>
								{whosTyping.map(typer => typer.username)} is
								typing
							</>
						</p>
					)}
				{whosTyping.length > 3 && (
					<p className="typer">
						{whosTyping.length} users are typing
					</p>
				)}
			</div>
			<NewChatBar
				handleSendType={handleSendTyping}
				handleSubmit={handleSend}
				formState={formState}
				setFormState={setFormState}
			/>
		</div>
	);
};

export default Chat;
