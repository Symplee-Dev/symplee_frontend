import {
	useGetMessagesQuery,
	useGetBlockedFriendsQuery,
	useMessageSentSubscription
} from '../graphql';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';
import { useState, useEffect } from 'react';
import { useUserTypingSubscriptionSubscription } from '../graphql';
import {
	Maybe,
	useMessageEditedSubscription,
	useMessageDeletedSubscription
} from '../graphql';

type ChatHandlerReturn = [loading: boolean];

export const useChatHandler = (
	chatId: number | undefined
): ChatHandlerReturn => {
	const [stillLoading, setLoading] = useState(false);

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

	const userId = useSelector((state: RootState) => state.user.userId)!;

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

	const { error: userTypingSubError } = useUserTypingSubscriptionSubscription({
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

	return [loading && messagesLoading];
};
