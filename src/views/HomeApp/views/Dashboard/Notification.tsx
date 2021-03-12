import {
	Maybe,
	useAcceptFriendMutation,
	useDeclineFriendMutation
} from '../../../../graphql';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import { Tooltip } from '@material-ui/core';
import Moment from 'react-moment';
import { UserSelectors } from '../../../../redux/selectors';
import { UIActions, UserActions } from '../../../../redux/actions/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import {
	useAcceptInviteMutation,
	useDeclineInviteMutation
} from '../../../../graphql';

const Notification = ({
	notif,
	refetch
}: {
	notif: Maybe<{
		id: number;
		description: string;
		type?: Maybe<string>;
		createdAt: string;
		read: boolean;
		from?: Maybe<{
			username: string;
			key: string;
			id: number;
		}>;
		code?: string;
	}>;
	refetch: () => void;
}) => {
	const userId = UserSelectors.useSelectUserId();

	const [acceptFriend] = useAcceptFriendMutation();
	const [declineFriend] = useDeclineFriendMutation();
	const [acceptGroup] = useAcceptInviteMutation();
	const [declineGroup] = useDeclineInviteMutation();
	const refetchGroups = UserActions.useRefetchUser();

	const addNotification = UIActions.useAddNotification();
	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const handleAccept = () => {
		acceptFriend({
			variables: {
				notificationId: notif?.id!,
				invite: { fromId: notif?.from?.id!, userId: userId! }
			}
		}).then(() => refetch());

		addNotification({
			title: 'You are now friends with ' + notif?.from?.username,
			id: notifId,
			type: 'success',
			autoDismiss: true,
			autoTimeoutTime: 3000
		});
	};

	const handleAcceptGroup = () => {
		acceptGroup({
			variables: {
				acceptArgs: {
					code: notif?.code!,
					notificationId: notif?.id!,
					userId: userId!
				}
			}
		}).then(() => {
			refetchGroups();

			addNotification({
				title: 'You have accepted an invite to join the group',
				id: notifId,
				type: 'success',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});
		});
	};

	const handleDeclineGroup = () => {
		declineGroup({
			variables: {
				declineArgs: {
					code: notif?.code!,
					notificationId: notif?.id!,
					userId: userId!
				}
			}
		}).then(() => {
			addNotification({
				title: 'You have declined an invite to join the group',
				id: notifId,
				type: 'error',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});
		});
	};

	const handleDecline = () => {
		declineFriend({
			variables: {
				notificationId: notif?.id!,
				invite: { fromId: notif?.from?.id!, userId: userId! }
			}
		}).then(() => refetch());

		addNotification({
			title:
				'You have declined ' +
				notif?.from?.username +
				"'s friend request",
			id: notifId,
			type: 'error',
			autoDismiss: true,
			autoTimeoutTime: 3000
		});
	};

	return (
		<div className={`notification ${notif?.read && 'read'}`}>
			<p>{notif?.description}</p>
			<div className="middle">
				<p className="read-p">{notif?.read ? 'Read' : 'Unread'}</p>
				{!notif?.read && notif?.type === 'FRIEND_REQUEST' && (
					<>
						<Tooltip placement="top" title="Decline">
							<CancelSharpIcon onClick={handleDecline} />
						</Tooltip>
						<Tooltip placement="top" title="Accept">
							<CheckCircleSharpIcon onClick={handleAccept} />
						</Tooltip>
					</>
				)}
				{!notif?.read && notif?.type === 'INVITE' && (
					<>
						<Tooltip placement="top" title="Decline">
							<CancelSharpIcon onClick={handleDeclineGroup} />
						</Tooltip>
						<Tooltip placement="top" title="Accept">
							<CheckCircleSharpIcon onClick={handleAcceptGroup} />
						</Tooltip>
					</>
				)}
				<p>
					<Moment fromNow>{notif?.createdAt}</Moment>
				</p>
			</div>
		</div>
	);
};

export default Notification;
