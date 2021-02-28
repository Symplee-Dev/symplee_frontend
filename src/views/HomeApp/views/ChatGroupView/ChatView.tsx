import {
	useMessageSentSubscription,
	useSendMessageMutation
} from '../../../../graphql';
import { LinearProgress, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { UserQuery, useUserQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
const ChatView = () => {
	const { loading, variables, data, error } = useMessageSentSubscription({
		variables: { chatGroupId: 1 },
		onSubscriptionData(data) {
			if (data.subscriptionData.data?.messageSent)
				setMessages([
					...messages,
					data.subscriptionData.data?.messageSent
				]);
		}
	});

	const id = UserSelectors.useSelectUserId();

	const { data: userData } = useUserQuery({
		fetchPolicy: 'cache-and-network',
		variables: { id: id! }
	});

	const [formState, setFormState] = useState('');

	const [sendMessage] = useSendMessageMutation();

	const [messages, setMessages] = useState<string[]>([]);

	const handleSend = e => {
		e.preventDefault();

		sendMessage({
			variables: { message: userData?.user.username + ' ' + formState }
		});
	};

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
			{messages.map((msg, key) => (
				<p key={key}>{msg}</p>
			))}
		</div>
	);
};

export default ChatView;
