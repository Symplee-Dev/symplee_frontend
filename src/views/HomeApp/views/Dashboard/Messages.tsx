import {
	CircularProgress,
	Popover,
	Tooltip,
	Checkbox
} from '@material-ui/core';
import AddSharp from '@material-ui/icons/AddSharp';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import {
	useGetDMsQuery,
	useGetAcceptedFriendsQuery,
	Maybe
} from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
import { useCreateDmMutation } from '../../../../graphql';
import { UIActions } from '../../../../redux/actions/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';

const Messages = () => {
	const userId = UserSelectors.useSelectUserId()!;
	const history = useHistory();

	const { data, refetch: refetchDMS } = useGetDMsQuery({
		variables: { userId }
	});
	const [anchor, setAnchor] = useState<any | null>(null);
	const { data: friendData, loading, refetch } = useGetAcceptedFriendsQuery({
		variables: { userId },
		onCompleted(d) {
			setLocalFriends(d.getAcceptedFriends);
		}
	});

	const [createDM] = useCreateDmMutation();

	const [searchString, setSearchString] = useState('');

	const [friendSearchString, setFriendSearchString] = useState('');

	const [selected, setSelected] = useState<number[]>([]);

	const addNotif = UIActions.useAddNotification();

	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const [localFriends, setLocalFriends] = useState<
		Maybe<{
			friendsSince: string;
			friend?: Maybe<{
				id: number;
				username: string;
				key: string;
				is_online: boolean;
			}>;
		}>[]
	>([]);

	useEffect(() => {
		refetch();
	}, []);

	const handleCreate = () => {
		if (selected.length < 1) {
			addNotif({
				id: notifId,
				title: 'One friend must be selected',
				type: 'error'
			});
			return;
		}

		if (friendData) {
			const users = friendData.getAcceptedFriends.filter(
				f => f && f.friend && selected.includes(f.friend.id)
			);

			createDM({
				variables: {
					dm: {
						isPublic: false,
						name: `${users.map(u => u?.friend?.username + ', ')}`,
						userId,
						avatar: '',
						type: 'DM',
						includes: selected
					}
				}
			}).then(d => {
				refetchDMS();
				history.push('/dm/' + d.data?.createDM.id);
			});
		}
	};

	const handleSelect = friendId => {
		if (selected.find(id => id === friendId)) {
			const newSelected = selected.filter(id => id !== friendId);
			setSelected(newSelected);
		} else {
			setSelected([...selected, friendId]);
		}
	};

	const checkIfSelected = (fid: number) => {
		const found = selected.find(id => id === fid);
		return found !== undefined ? true : false;
	};

	const handleFilter = e => {
		setFriendSearchString(e.target.value);

		if (e.target.value.length <= 0) {
			if (friendData) {
				setLocalFriends(friendData.getAcceptedFriends);
			}
		} else {
			if (friendData) {
				const newFriends = friendData?.getAcceptedFriends.filter(
					friend =>
						friend?.friend?.username
							.toLowerCase()
							.includes(e.target.value.toLowerCase()) ||
						friend?.friend?.key
							.toLowerCase()
							.includes(e.target.value.toLowerCase())
				);
				setLocalFriends(newFriends);
			}
		}
	};

	return (
		<div className="dms">
			<div className="dms-sidebar">
				<div className="dms-sidebar-actions">
					<input
						value={searchString}
						onChange={e => setSearchString(e.target.value)}
						type="text"
						placeholder="Search for a chat"
						className="dm-searchbar"
					/>
					<Tooltip placement="right" title="Start a chat">
						<div
							style={{ display: 'flex', alignItems: 'center' }}
							onClick={e => {
								console.log(e.currentTarget);
								setAnchor(e.currentTarget);
							}}
						>
							<AddSharp className="add-btn" />
						</div>
					</Tooltip>
					{anchor !== undefined && anchor !== null && (
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
							<div className="add-popover">
								{loading && <CircularProgress />}

								{!loading && (
									<>
										<h3>Start a chat</h3>
										<p>
											Add one or multiple friends to start
											chatting ({selected.length}{' '}
											selected)
										</p>
										<input
											value={friendSearchString}
											onChange={e => handleFilter(e)}
											type="text"
											placeholder="Search for a friend"
											className="dm-searchbar"
										/>
										<h4>Friends</h4>
										<div className="friends">
											{localFriends.map((f, key) => (
												<div
													className="friend"
													key={key}
												>
													<Checkbox
														color="primary"
														onChange={() =>
															handleSelect(
																f?.friend?.id
															)
														}
														checked={checkIfSelected(
															f?.friend
																?.id as number
														)}
													/>
													{f?.friend?.username}#
													{f?.friend?.key}
												</div>
											))}
										</div>
									</>
								)}
								<button
									className="start-btn"
									onClick={handleCreate}
								>
									Start chatting
								</button>
							</div>
						</Popover>
					)}
				</div>

				{data && (
					<>
						<>
							{data.getDMS.map((dm, key) => (
								<div className="dm-button" key={key}>
									<p>{dm?.name}</p>
								</div>
							))}
						</>
						{data.getDMS.length < 1 && <p>No Direct Messages</p>}
					</>
				)}
			</div>
			<Switch>
				<Route path="/dm/:id">1</Route>
			</Switch>
		</div>
	);
};

export default Messages;
