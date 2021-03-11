import { Avatar, CircularProgress, Tooltip } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import './style.scss';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import {
	useAddFriendMutation,
	useGetFriendsQuery,
	Maybe
} from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
import { UIActions } from '../../../../redux/actions/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import Moment from 'react-moment';
import { useRemoveFriendMutation } from '../../../../graphql';

export const UserPopover = ({
	anchor,
	setAnchor,
	user
}: {
	anchor;
	setAnchor;
	user: {
		id: number;
		username: string;
		avatar?: string | undefined;
	};
}) => {
	const userId = UserSelectors.useSelectUserId()!;
	const [addFriend] = useAddFriendMutation();
	const [removeFriend] = useRemoveFriendMutation();

	const addNotification = UIActions.useAddNotification();
	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const history = useHistory();

	const { data, loading, refetch } = useGetFriendsQuery({
		variables: { userId, friendId: user.id },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'network-only'
	});

	const [thisFriend, setThisFriend] = useState<
		| {
				id: number;
				userId: number;
				friendsSince: string;
				status: string;
				friend?: Maybe<{
					id: number;
				}>;
				sentBy: number;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		console.log('new data');
		if (data) {
			const friend = data.getFriends.find(
				friend =>
					friend?.friend?.id === user.id && friend.userId === userId
			);
			if (friend) {
				setThisFriend(friend);
			}
		}
	}, [data, user.id, userId]);

	const handleClose = () => {
		setAnchor(null);
	};

	const open = Boolean(anchor);

	const handleAdd = () => {
		addFriend({
			variables: {
				friendRequest: {
					friendId: user.id,
					userId: userId!
				}
			}
		}).then(() => {
			addNotification({
				title: 'Friend request sent!',
				id: notifId,
				type: 'success',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});

			refetch();
		});
	};

	const handleRemove = () => {
		if (!thisFriend || !thisFriend.friend) return;
		removeFriend({
			variables: { friendId: thisFriend.friend.id, userId: userId }
		}).then(() => {
			addNotification({
				title: 'Friend has been unadded.',
				id: notifId,
				type: 'error',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});

			refetch();
		});
	};

	return (
		<Popover
			open={open}
			anchorEl={anchor}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			<div className="user-popup">
				<div className="top">
					<div className="left">
						<Avatar src={user.avatar}>
							{user.username[0].toUpperCase()}
						</Avatar>

						<h3>{user.username}</h3>
					</div>
					{!loading &&
						user.id !== userId &&
						thisFriend &&
						thisFriend.status !== 'PENDING' &&
						thisFriend.status !== 'FRIENDS' &&
						data?.getFriends &&
						data?.getFriends.length > 0 && (
							<div className="right">
								<Tooltip
									placement="right"
									title="Send friend request"
								>
									<PersonAddSharpIcon
										onClick={handleAdd}
										style={{
											width: '30px',
											height: '30px'
										}}
									/>
								</Tooltip>
							</div>
						)}
					{!loading && user.id !== userId && !thisFriend && (
						<div className="right">
							<Tooltip
								placement="right"
								title="Send friend request"
							>
								<PersonAddSharpIcon
									onClick={handleAdd}
									style={{
										width: '30px',
										height: '30px'
									}}
								/>
							</Tooltip>
						</div>
					)}

					{!loading &&
						user.id !== userId &&
						thisFriend &&
						thisFriend.status === 'PENDING' &&
						thisFriend.sentBy !== userId && (
							<div className="right">
								<Tooltip
									placement="right"
									title="View Friend Requests"
								>
									<AccessTimeSharpIcon
										onClick={() => history.push('/')}
										style={{
											width: '30px',
											height: '30px'
										}}
									/>
								</Tooltip>
							</div>
						)}

					{!loading &&
						user.id !== userId &&
						thisFriend &&
						thisFriend.status === 'PENDING' &&
						thisFriend.userId === userId &&
						thisFriend.sentBy === userId && (
							<div className="right">
								<Tooltip
									placement="right"
									title="Friend Request Pending"
								>
									<AccessTimeSharpIcon
										style={{
											width: '30px',
											height: '30px'
										}}
									/>
								</Tooltip>
							</div>
						)}

					{!loading &&
						user.id !== userId &&
						thisFriend &&
						thisFriend.status === 'FRIENDS' &&
						data?.getFriends &&
						data.getFriends.length > 0 && (
							<div className="right">
								<Tooltip
									placement="right"
									title="Remove Friend"
								>
									<RemoveCircleSharpIcon
										onClick={() => handleRemove()}
										style={{
											width: '30px',
											height: '30px',
											color: 'darkgray'
										}}
									/>
								</Tooltip>
							</div>
						)}

					{loading && <CircularProgress />}
				</div>
				{!loading &&
					user.id !== userId &&
					thisFriend &&
					thisFriend.status === 'FRIENDS' &&
					data?.getFriends &&
					data.getFriends.length > 0 && (
						<p className="friends-since">
							Friends since{' '}
							<Moment ago format="MMM, D YYYY">
								{thisFriend.friendsSince}
							</Moment>
						</p>
					)}
				<div className="content">
					<button
						onClick={() => history.push('/user/profile/' + user.id)}
					>
						View
					</button>
				</div>
			</div>
		</Popover>
	);
};

export default UserPopover;
