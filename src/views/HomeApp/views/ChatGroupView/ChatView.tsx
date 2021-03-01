import {
	useMessageSentSubscription,
	useSendMessageMutation
} from '../../../../graphql';
import { LinearProgress, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
	UserQuery,
	useUserQuery,
	useGetMessagesLazyQuery
} from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
import { useParams } from 'react-router';
import {
	GetMessagesQueryResult,
	Maybe,
	useGetMessagesQuery
} from '../../../../graphql';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
const ChatView = () => {
	const params: { chatGroupId: string; chatId: string } = useParams();

	useMessageSentSubscription({
		variables: { chatId: Number(params.chatId) },
		onSubscriptionData(data) {
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

	if (loading || !data) return <LinearProgress color="primary" />;

	return (
		<div>
			<form onSubmit={handleSend}>
				<TextField
					type="text"
					fullWidth
					variant="filled"
					value={formState}
					onChange={e => setFormState(e.target.value)}
					placeholder="message"
					inputProps={{ style: { color: 'white' } }}
				/>
			</form>
			<p>Chats</p>
			<div style={{ overflowY: 'scroll', height: '100vh' }}>
				{messages.map((msg, key) => (
					<div
						style={{ marginTop: '1.2rem', marginBottom: '1.2rem' }}
						key={key}
					>
						<h3>{msg?.author.username}</h3>
						<p>{msg?.body}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatView;
