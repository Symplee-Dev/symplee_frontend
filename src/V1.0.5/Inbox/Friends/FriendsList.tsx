import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import { useState, useEffect } from 'react';
import {
	GetAcceptedFriendsQuery,
	useGetBlockedFriendsLazyQuery
} from '../../../graphql';
import {
	useGetAcceptedFriendsLazyQuery,
	useGetPendingFriendsLazyQuery
} from '../../../graphql';
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
		},
		fetchPolicy: 'network-only'
	});

	const [getBlocked] = useGetBlockedFriendsLazyQuery({
		onCompleted: d => {
			setFriends(d.getBlockedFriends);
		},
		fetchPolicy: 'network-only'
	});

	const [getPending] = useGetPendingFriendsLazyQuery({
		onCompleted: d => {
			setFriends(d.getPendingFriends);
		},
		fetchPolicy: 'network-only'
	});

	useEffect(() => {
		if (friends.length < 1 && userId && activeFilter === 'ALL') {
			getAll({ variables: { userId } });
		}
	}, [friends, activeFilter, userId, getAll]);

	const handleFilter = (newFilter: 'ALL' | 'BLOCKED' | 'PENDING') => {
		setActiveFilter(newFilter);
		if (newFilter === 'ALL') {
			getAll({ variables: { userId } });
		}
		if (newFilter === 'BLOCKED') {
			getBlocked({ variables: { userId } });
		}

		if (newFilter === 'PENDING') {
			getPending({ variables: { userId } });
		}
	};

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
						clickHandler={() => handleFilter('ALL')}
					/>
					<Button
						style={{ opacity: checkActiveFilter('PENDING') }}
						content="Pending"
						size="small"
						color="main"
						clickHandler={() => handleFilter('PENDING')}
					/>
					<Button
						style={{ opacity: checkActiveFilter('BLOCKED') }}
						content="Blocked"
						size="small"
						color="main"
						clickHandler={() => handleFilter('BLOCKED')}
					/>
				</div>
				<div className="right">
					<Button
						style={{ opacity: checkActiveFilter('BLOCKED') }}
						content="Add"
						size="small"
						color="lightmain"
						clickHandler={() => alert('not implemented')}
					/>
				</div>
			</div>

			<div className="users">
				{friends.map((f, key) => (
					<User
						friend={f}
						type={
							activeFilter === 'ALL'
								? 'FRIEND'
								: activeFilter === 'BLOCKED'
								? 'BLOCKED'
								: activeFilter === 'PENDING'
								? 'PENDING'
								: 'FRIEND'
						}
						key={key}
					/>
				))}
			</div>
			<p
				style={{
					marginTop: '1rem',
					opacity: 0.5,
					textAlign: 'center'
				}}
			>
				{friends.length} {activeFilter === 'BLOCKED' && 'blocked'}{' '}
				{activeFilter === 'PENDING' && 'pending'} friend
				{friends.length > 1 || activeFilter === 'PENDING' ? 's' : ''}
			</p>
		</div>
	);
};

export default FriendsList;
