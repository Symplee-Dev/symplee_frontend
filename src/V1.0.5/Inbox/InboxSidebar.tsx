import { Avatar } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';
import { Button } from '../components';
import Moment from 'react-moment';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReactPath } from '../../hooks/useReactPath';
import EmptyInbox from './EmptyInbox';
import { useGetDMsQuery, useGetDMsLazyQuery } from '../../graphql';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const InboxSidebar = () => {
	const path = useReactPath();
	const user = useSelector((state: RootState) => state.user.user)!;

	const history = useHistory();

	const [getDms, data] = useGetDMsLazyQuery();
	useEffect(() => {
		if (!data.data && user) {
			getDms({ variables: { userId: user.id } });
		}
	}, [data.data, getDms, user]);

	if (!user) {
		return null;
	}

	return (
		<div className="inbox-sidebar">
			<div className="user-card">
				<Avatar
					src={user.avatar ?? ''}
					fallback={user.name[0]}
					hasStatus={true}
					className="large"
				/>
				<h4>
					{user.username}#{user.key}
				</h4>
				<p className="subtitle">{user.name}</p>

				<p className="subtitle">
					Joined <Moment fromNow>{user.createdAt}</Moment>
				</p>
				<Button
					clickHandler={() => alert('Not implemented')}
					content="Update"
					size="large"
				/>
			</div>
			<div
				className={`friends-btn ${path === '/' && 'active'}`}
				onClick={() => history.push('/')}
			>
				<h4>View Friends</h4>
				<FontAwesomeIcon icon={faUserFriends} />
			</div>
			{data.data && data.data.getDMS.length < 1 && (
				<div className="dm-list dm-list-empty">
					<EmptyInbox />
					<p>Your Inbox Is Empty Right Now</p>
					<Button
						clickHandler={() => alert('Not implemented')}
						content="Start Messaging"
						size="large"
					/>
				</div>
			)}
			{data.data && data.data.getDMS.length > 0 && (
				<>
					<Button
						style={{ height: '40px' }}
						clickHandler={() => alert('Not implemented')}
						content="Start Messaging"
						size="large"
					/>
					<div className="dm-list">
						{data.data.getDMS.map((dm, key) => (
							<div
								className="dm-card"
								key={key}
								onClick={() => history.push('/dm/' + dm?.id)}
							>
								{dm?.name}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default InboxSidebar;
