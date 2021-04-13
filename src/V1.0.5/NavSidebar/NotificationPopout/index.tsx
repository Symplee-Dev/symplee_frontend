import './style.scss';
import { Popover, Tooltip, CircularProgress } from '@material-ui/core';
import {
	useGetNotificationsQuery,
	useAcceptFriendMutation,
	useDeclineFriendMutation,
	useAcceptInviteMutation,
	useDeclineInviteMutation
} from '../../../graphql';
import { UserSelectors } from '../../../redux/selectors';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { UserActions, UIActions } from '../../../redux/actions/index';
import { RootState } from '../../../redux/types/state-types';
import { Maybe } from '../../../graphql';
import { useEffect } from 'react';

export interface PopoutProps {
	anchor: any;
	setAnchor: React.Dispatch<any>;
}

type Notif = Maybe<{
	id: number;
	description: string;
	type?: Maybe<string>;
	createdAt: string;
	read: boolean;
	code?: Maybe<string>;
	from?: Maybe<{
		username: string;
		key: string;
		id: number;
	}>;
}>;

const NotificationPopout = ({ anchor, setAnchor }: PopoutProps) => {
	const userId = UserSelectors.useSelectUserId();

	const { data, loading, error, refetch } = useGetNotificationsQuery({
		skip: !userId,
		variables: { type: 'ALL', userId: userId! },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'network-only'
	});

	const [acceptFriend] = useAcceptFriendMutation();
	const [declineFriend] = useDeclineFriendMutation();
	const [acceptGroup] = useAcceptInviteMutation();
	const [declineGroup] = useDeclineInviteMutation();
	const refetchGroups = UserActions.useRefetchUser();

	const addNotification = UIActions.useAddNotification();
	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const handleAcceptGroup = (notif?: Notif) => {
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

	const handleDeclineGroup = (notif?: Notif) => {
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

	const handleAccept = (notif?: Notif) => {
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

	const handleDecline = (notif?: Notif) => {
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

	if (anchor) {
		refetch();
	}

	return (
		<Popover
			style={{ marginLeft: '2rem' }}
			onClose={() => setAnchor(null)}
			open={anchor !== undefined && anchor !== null}
			anchorEl={anchor}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			{loading && <CircularProgress />}
			<div className="notif-popover">
				<div className="notifs">
					{!loading && data && data.getNotifications.length > 1
						? data.getNotifications
								.map((notif, key) => (
									<div
										className="notif"
										key={key}
										style={{
											opacity: notif?.read ? 0.4 : 1
										}}
									>
										<div className="left">
											<p className="desc">
												{notif?.description}
											</p>
											<p className="sub">
												{notif?.read
													? 'Read'
													: 'Unread'}
											</p>
											<p className="sub">
												<Moment fromNow>
													{notif?.createdAt}
												</Moment>
											</p>
										</div>

										<div className="right">
											{!notif?.read &&
												notif?.type ===
													'FRIEND_REQUEST' && (
													<>
														<Tooltip
															placement="top"
															title="Decline"
														>
															<CancelSharpIcon
																onClick={() =>
																	handleDecline(
																		notif
																	)
																}
															/>
														</Tooltip>
														<Tooltip
															placement="top"
															title="Accept"
														>
															<CheckCircleSharpIcon
																onClick={() =>
																	handleAccept(
																		notif
																	)
																}
															/>
														</Tooltip>
													</>
												)}
											{!notif?.read &&
												notif?.type === 'INVITE' && (
													<>
														<Tooltip
															placement="top"
															title="Decline"
														>
															<CancelSharpIcon
																onClick={() =>
																	handleDeclineGroup(
																		notif
																	)
																}
															/>
														</Tooltip>
														<Tooltip
															placement="top"
															title="Accept"
														>
															<CheckCircleSharpIcon
																onClick={() =>
																	handleAcceptGroup(
																		notif
																	)
																}
															/>
														</Tooltip>
													</>
												)}
										</div>
									</div>
								))
								.reverse()
						: null}
				</div>
			</div>
		</Popover>
	);
};

export default NotificationPopout;
