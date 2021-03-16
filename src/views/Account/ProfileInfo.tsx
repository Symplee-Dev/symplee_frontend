import Moment from 'react-moment';
import { UserProps } from './Account';

interface ProfileInfoProps {
	user: UserProps;
}
export const ProfileInfo = ({ user }: ProfileInfoProps) => {
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
