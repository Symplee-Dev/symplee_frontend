import './styles.scss';
import { UISelectors, UserSelectors } from '../../../../redux/selectors';
import {
	useBlockUserMutation,
	useGetBlockedFriendsQuery,
	useUnblockUserMutation
} from '../../../../graphql';
import { useHistory } from 'react-router';
import { Dispatch, SetStateAction } from 'react';

const PublicProfileSidebar = ({
	setDashboardRoute
}: {
	setDashboardRoute: Dispatch<
		SetStateAction<'FRIENDS' | 'ROOT' | 'MESSAGES' | 'TEAMS'>
	>;
}) => {
	const currentProfile = UISelectors.useSelectCurrentProfile()!;
	const userId = UserSelectors.useSelectUserId()!;
	const [blockUser] = useBlockUserMutation();
	const [unblockUser] = useUnblockUserMutation();
	const { data } = useGetBlockedFriendsQuery({ variables: { userId } });
	const history = useHistory();

	const handleBlock = () => {
		blockUser({
			variables: { otherUserId: currentProfile.user.id, userId }
		});
		setDashboardRoute('FRIENDS');
		history.push('/');
	};

	const handleUnblock = () => {
		unblockUser({
			variables: { otherUserId: currentProfile.user.id, userId }
		});
		setDashboardRoute('FRIENDS');
		history.push('/');
	};

	return (
		<div className="public-profile-sidebar">
			<div className="top">
				<h3>Profile</h3>
			</div>
			<div className="content">
				<h4>User Actions</h4>

				{data && currentProfile && (
					<div className="actions">
						{data?.getBlockedFriends.find(
							f => f?.friend?.id === currentProfile.user.id
						) === undefined ? (
							<button onClick={handleBlock}>Block</button>
						) : (
							<>
								{data.getBlockedFriends.find(
									f =>
										f?.friend?.id === currentProfile.user.id
								)?.blockedBy === userId && (
									<button onClick={handleUnblock}>
										Unblock
									</button>
								)}
							</>
						)}
						<button>Send Message</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PublicProfileSidebar;
