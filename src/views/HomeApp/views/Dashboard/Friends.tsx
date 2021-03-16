import {
	Avatar,
	CircularProgress,
	TextField,
	Tooltip
} from '@material-ui/core';
import { UserSelectors } from '../../../../redux/selectors';
import {
	useGetAcceptedFriendsQuery,
	useGetBlockedFriendsQuery
} from '../../../../graphql';
import Moment from 'react-moment';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Friends = () => {
	const userId = UserSelectors.useSelectUserId()!;
	const { data, loading, refetch } = useGetAcceptedFriendsQuery({
		variables: { userId }
	});

	useEffect(() => {
		refetch();
		refetchBlocked();
	}, []);

	const {
		data: blockedData,
		refetch: refetchBlocked
	} = useGetBlockedFriendsQuery({
		variables: { userId }
	});

	const history = useHistory();

	return (
		<div className="friends">
			<div className="top">
				<p>Add A Friend</p>
				<form>
					<TextField
						fullWidth
						variant="filled"
						placeholder="BeppBoop#C3P0"
						InputProps={{ className: 'text-input' }}
					/>
					<button>Send</button>
				</form>
			</div>
			<div className="content">
				{loading ? (
					<CircularProgress />
				) : (
					<>
						{blockedData &&
							blockedData.getBlockedFriends.length > 0 && (
								<>
									<h3>
										{blockedData?.getBlockedFriends.filter(
											f => f?.blockedBy === userId
										).length > 0 && 'Blocked'}
									</h3>
									<>
										{blockedData?.getBlockedFriends
											.filter(
												f => f?.blockedBy === userId
											)
											.map((f, key) => (
												<Tooltip
													placement="top"
													title="View Profile"
													key={key}
												>
													<div
														className="friend"
														onClick={() =>
															history.push(
																'/user/profile/' +
																	f?.friend
																		?.id
															)
														}
													>
														<div className="friend-top">
															<h5>
																{
																	f?.friend
																		?.username
																}
																#
																{f?.friend?.key}
															</h5>
															<p>
																{f?.friend
																	?.is_online
																	? 'Online'
																	: 'Offline'}
															</p>
														</div>
														<h3>
															Friends Since{' '}
															<Moment
																ago
																format="MMM, D YYYY"
															>
																{
																	f?.friendsSince
																}
															</Moment>
														</h3>
													</div>
												</Tooltip>
											))}
									</>
								</>
							)}
						<h3 style={{ marginTop: '2rem' }}>Friends</h3>
						<div className="friend-list">
							<>
								{data?.getAcceptedFriends.map((f, key) => (
									<Tooltip
										key={key}
										placement="top"
										title="View Profile"
									>
										<div
											className="friend"
											onClick={() =>
												history.push(
													'/user/profile/' +
														f?.friend?.id
												)
											}
										>
											<div className="friend-top">
												<h5>
													{f?.friend?.username}#
													{f?.friend?.key}
												</h5>
												<p>
													{f?.friend?.is_online
														? 'Online'
														: 'Offline'}
												</p>
											</div>
											<h3>
												Friends Since{' '}
												<Moment
													ago
													format="MMM, D YYYY"
												>
													{f?.friendsSince}
												</Moment>
											</h3>
										</div>
									</Tooltip>
								))}
							</>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Friends;
