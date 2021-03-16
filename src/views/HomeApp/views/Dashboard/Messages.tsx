import { CircularProgress, Popover, Tooltip } from '@material-ui/core';
import AddSharp from '@material-ui/icons/AddSharp';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import {
	useGetDMsQuery,
	useGetFriendsQuery,
	useGetAcceptedFriendsQuery
} from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';

const Messages = () => {
	const userId = UserSelectors.useSelectUserId()!;

	const { data } = useGetDMsQuery({ variables: { userId } });
	const [anchor, setAnchor] = useState<any | null>(null);
	const { data: friendData, loading, refetch } = useGetAcceptedFriendsQuery({
		variables: { userId }
	});

	useEffect(() => {
		refetch();
	}, []);

	return (
		<div className="dms">
			<div className="dms-sidebar">
				<div className="dms-sidebar-actions">
					<input
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
											chatting
										</p>
										<h4>Friends</h4>
										<div className="friends">
											{friendData?.getAcceptedFriends.map(
												(f, key) => (
													<div
														className="friend"
														key={key}
													>
														{f?.friend?.username}#
														{f?.friend?.key}
													</div>
												)
											)}
										</div>
									</>
								)}
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
