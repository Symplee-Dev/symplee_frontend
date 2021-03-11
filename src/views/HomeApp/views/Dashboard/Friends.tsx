import { Avatar, CircularProgress, TextField } from '@material-ui/core';
import { UserSelectors } from '../../../../redux/selectors';
import { useGetAcceptedFriendsQuery } from '../../../../graphql';
import Moment from 'react-moment';
import { useHistory } from 'react-router';

const Friends = () => {
	const userId = UserSelectors.useSelectUserId()!;
	const { data, loading, error } = useGetAcceptedFriendsQuery({
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
					<div className="friend-list">
						{data?.getAcceptedFriends.map((f, key) => (
							<div
								className="friend"
								onClick={() =>
									history.push(
										'/user/profile/' + f?.friend?.id
									)
								}
							>
								<div className="friend-top" key={key}>
									<h5>
										{f?.friend?.username}#{f?.friend?.key}
									</h5>
									<p>
										{f?.friend?.is_online
											? 'Online'
											: 'Offline'}
									</p>
								</div>
								<h3>
									Friends Since{' '}
									<Moment ago format="MMM, D YYYY">
										{f?.friendsSince}
									</Moment>
								</h3>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Friends;
