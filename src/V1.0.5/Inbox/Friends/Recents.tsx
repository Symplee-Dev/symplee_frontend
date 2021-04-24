import { useGetAcceptedFriendsQuery } from '../../../graphql';
import { UserSelectors } from '../../../redux/selectors';
import Recent from './Recent';

const Recents = () => {
	const userId = UserSelectors.useSelectUserId()!;

	const { data, loading, error } = useGetAcceptedFriendsQuery({
		variables: { userId }
	});

	return (
		<div className="recents">
			<h4>Suggested</h4>
			<div className="recent-list">
				{data?.getAcceptedFriends.map((f, key) =>
					f && f.friend && key < 4 ? (
						<Recent user={f} key={key} />
					) : null
				)}
			</div>
		</div>
	);
};

export default Recents;
