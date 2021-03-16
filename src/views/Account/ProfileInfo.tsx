import Moment from 'react-moment';

export const ProfileInfo = ({ user }) => {
	return (
		<div className="profile-info">
			<div>
				<h4 style={{ fontWeight: 'normal' }}>{user.name}</h4>
			</div>

			<div className="user-email">
				<h6>{user.email}</h6>
			</div>

			<div className="joined">
				<h6>
					Joined{' '}
					<Moment fromNow={true} ago>
						{new Date(user.createdAt)}
					</Moment>{' '}
					ago
				</h6>
			</div>
		</div>
	);
};
