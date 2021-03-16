import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';
import { Snackbar } from '@material-ui/core';
import { UIActions } from '../redux/actions/index';
import { Alert, Color } from '@material-ui/lab';
import { useMailboxUpdateSubscription } from '../graphql';
import { UserSelectors, UISelectors } from '../redux/selectors';
import { useState } from 'react';
import { useHistory } from 'react-router';

import './style.scss';

const Notifications = () => {
	const notifications = useSelector(
		(state: RootState) => state.ui.notifications
	);

	const userId = UserSelectors.useSelectUserId()!;
	const [mailbox, setMailbox] = useState<
		{
			id: string;
			body: string;
			title: string;
			goTo: string;
		}[]
	>([]);

	const history = useHistory();

	const currentChat = UISelectors.useSelectCurrentChat();

	const clearNotification = UIActions.useClearNotification();

	useMailboxUpdateSubscription({
		variables: { userId },
		onSubscriptionData(d) {
			if (
				d &&
				d.subscriptionData &&
				d.subscriptionData.data &&
				d.subscriptionData.data.mailboxUpdate
			) {
				console.log('Received');
				if (currentChat) {
					if (
						!d.subscriptionData.data.mailboxUpdate.goTo.includes(
							'/chat/' + currentChat.id
						)
					) {
						setMailbox([
							...mailbox,
							d.subscriptionData.data.mailboxUpdate
						]);
					}
				} else {
					setMailbox([
						...mailbox,
						d.subscriptionData.data.mailboxUpdate
					]);
				}
			}
		}
	});

	const removeFromMailbox = (id: string) => {
		setMailbox([...mailbox.filter(m => m.id !== id)]);
	};

	return (
		<>
			{notifications.map(n => (
				<Snackbar
					key={n.id}
					open={true}
					autoHideDuration={n.autoTimeoutTime ?? 3000}
					onClose={() => clearNotification(n.id)}
				>
					<Alert
						onClose={() => clearNotification(n.id)}
						severity={n.type as Color}
					>
						{n.title}
					</Alert>
				</Snackbar>
			))}
			{mailbox.map((n, key) => (
				<Snackbar
					key={key}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={true}
					autoHideDuration={3000}
					onClose={() => removeFromMailbox(n.id)}
					message={
						<div className="new-mail">
							<h5>{n.title}</h5>
							<p>{n.body}</p>
						</div>
					}
					action={
						n.goTo.length > 0 && (
							<>
								<button
									className="mail-button"
									onClick={() => history.push(n.goTo)}
								>
									View
								</button>
							</>
						)
					}
				></Snackbar>
			))}
		</>
	);
};

export default Notifications;
