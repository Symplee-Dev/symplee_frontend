import { Avatar } from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import Moment from 'react-moment';

interface RecentProps {
	avatar: string;
	name: string;
	username: string;
	key: string;
	createdAt: string;
}

const Recent = ({ ...user }: RecentProps) => {
	return (
		<div className="recent">
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
	);
};

export default Recent;
