import {
	useGetMessagesQuery,
	useGetBlockedFriendsQuery,
	useMessageSentSubscription
} from '../graphql';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';
import { useState, useEffect } from 'react';
import {
	useUserTypingSubscriptionSubscription,
	useSendMessageMutation,
	useSendUserTypingMutation
} from '../graphql';
import {
	Maybe,
	useMessageEditedSubscription,
	useMessageDeletedSubscription
} from '../graphql';

type ChatHandlerReturn = [
	loading: boolean,
	whosTyping: {
		userId: number;
		username: string;
	}[],
	formState: string,
	setFormState: React.Dispatch<React.SetStateAction<string>>,
	messages: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: {
			id: number;
			username: string;
			avatar?: string;
		};
	}>[],
	handleSend: (e: any) => void,
	handleSendTyping: () => void,
	end: HTMLSpanElement | null,
	setEnd: React.Dispatch<React.SetStateAction<HTMLSpanElement | null>>,
	firstLoad: boolean,
	setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
];

export const useChatHandler = (
	chatId: number | undefined
): ChatHandlerReturn => {
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

	const [formState, setFormState] = useState('');
	const [end, setEnd] = useState<HTMLSpanElement | null>(null);
	const [firstLoad, setFirstLoad] = useState(true);

	const userId = useSelector((state: RootState) => state.user.userId)!;
	const user = useSelector((state: RootState) => state.user.user!);

	const [sendMessage] = useSendMessageMutation();
	const [sendUserTyping] = useSendUserTypingMutation();

	const {
		data,
		refetch,
		loading: messagesLoading,
		error: messagesError
	} = useGetMessagesQuery({
		skip: !chatId,
		variables: { chatId: chatId! },
		onCompleted(d) {
			if (d) {
				setMessages(
					d.getMessages.filter(
						msg =>
							!blockedFriendsData?.getBlockedFriends.find(
								f => f?.friend?.id === msg?.author.id
							)
					)
				);
			}
		},
		nextFetchPolicy: 'network-only',
		fetchPolicy: 'network-only'
	});

	const {
		data: blockedFriendsData,
		loading,
		error,
		refetch: refetchBlocked
	} = useGetBlockedFriendsQuery({
		variables: { userId }
	});

	useMessageSentSubscription({
		skip: !chatId,

		variables: { chatId: chatId! },
		onSubscriptionData: data => {
			console.log('received message');
			if (data.subscriptionData.data?.messageSent)
				if (blockedFriendsData) {
					if (
						blockedFriendsData.getBlockedFriends.find(
							f =>
								f?.friend?.id ===
								data.subscriptionData.data?.messageSent.author.id
						) === undefined
					) {
						setMessages([...messages, data.subscriptionData.data?.messageSent]);
					}
				} else {
					setMessages([...messages, data.subscriptionData.data?.messageSent]);
				}
		}
	});

	useMessageEditedSubscription({
		skip: !chatId,
		variables: { chatId: chatId! },
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
		skip: !chatId,
		variables: { chatId: chatId! },
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
		variables: { chatId: chatId! },
		onSubscriptionData(data) {
			console.log('received typed');
			if (data.subscriptionData.data?.userTyping)
				if (
					whosTyping.find(
						typer =>
							typer.userId === data.subscriptionData.data?.userTyping?.userId
					)
				) {
					if (blockedFriendsData) {
						if (
							blockedFriendsData.getBlockedFriends.find(
								f => f?.friend?.id === data.subscriptionData.data?.userTyping
							) === undefined
						) {
							setWhosTyping([
								...whosTyping.filter(
									typer =>
										typer.userId !==
											data.subscriptionData.data?.userTyping?.userId &&
										data.subscriptionData.data?.userTyping?.userId !== userId
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

	// If Errors
	useEffect(() => {
		if (error || messagesError) {
			refetch();
			refetchBlocked();
		}
	}, [error, messagesError, refetch, refetchBlocked]);

	const handleSend = e => {
		e.preventDefault();

		if (formState.length <= 0) {
			return;
		}

		const chat = {
			authorId: user.id,
			authorUsername: user.username,
			body: formState,
			chatId: chatId!
		};

		sendMessage({
			variables: { message: chat }
		});

		console.log('sending');

		setFormState('');
	};

	const handleSendTyping = () => {
		sendUserTyping({
			variables: { chatId: chatId!, userId, username: user.username }
		});
	};

	return [
		loading && messagesLoading,
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
	];
};
