import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import { useState, useEffect } from 'react';
import { GetAcceptedFriendsQuery } from '../../../graphql';
import { useGetAcceptedFriendsLazyQuery } from '../../../graphql';
import { UserSelectors } from '../../../redux/selectors';
import User from './User';

const FriendsList = () => {
	const [activeFilter, setActiveFilter] = useState<
		'ALL' | 'PENDING' | 'BLOCKED'
	>('ALL');

	const [friends, setFriends] = useState<
		GetAcceptedFriendsQuery['getAcceptedFriends']
	>([]);

	const userId = UserSelectors.useSelectUserId()!;

	function checkActiveFilter(input: string): number {
		if (activeFilter === input) return 0.8;

		return 1;
	}

	const [getAll, { data, loading, error }] = useGetAcceptedFriendsLazyQuery({
		onCompleted: d => {
			setFriends(d.getAcceptedFriends);
		}
	});

	useEffect(() => {
		if (friends.length < 1 && userId) {
			getAll({ variables: { userId } });
		}
	}, [friends, activeFilter, userId, getAll]);

	return (
		<div className="friends-list">
			<div className="header">
				<h4>Friends</h4>
				<FontAwesomeIcon icon={faUserFriends} />
			</div>

			<div className="header-btns">
				<div className="left">
					<Button
						style={{ opacity: checkActiveFilter('ALL') }}
						content="All"
						size="small"
						color="main"
						clickHandler={() => alert('not implemented')}
					/>
					<Button
						style={{ opacity: checkActiveFilter('PENDING') }}
						content="Pending"
						size="small"
						color="main"
						clickHandler={() => alert('not implemented')}
					/>
					<Button
						style={{ opacity: checkActiveFilter('BLOCKED') }}
						content="Blocked"
						size="small"
						color="main"
						clickHandler={() => alert('not implemented')}
					/>
				</div>
				<div className="right">
					<Button
						style={{ opacity: checkActiveFilter('BLOCKED') }}
						content="Add"
						size="small"
						color="success"
						clickHandler={() => alert('not implemented')}
					/>
				</div>
			</div>

			<div className="users">
				{friends.map(f => (
					<User friend={f} type="FRIEND" />
				))}
			</div>
			<p
				style={{
					marginTop: '1rem',
					opacity: 0.5,
					textAlign: 'center'
				}}
			>
				{friends.length} friends
			</p>
		</div>
	);
};

export default FriendsList;
