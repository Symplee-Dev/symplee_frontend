import { Maybe } from '../../../graphql';
import { Avatar } from '../../components/Avatar/Avatar';
import Moment from 'react-moment';

interface UserProps {
	friend: Maybe<{
		friendsSince: string;
		friend?: Maybe<{
			id: number;
			username: string;
			key: string;
			is_online: boolean;
			avatar?: Maybe<string>;
		}>;
	}>;
	type: 'FRIEND' | 'PENDING' | 'BLOCKED';
}

const User = ({ type, friend }: UserProps) => {
	if (!friend || !friend?.friend) return null;

	return (
		<div className="user">
			<div className="left">
				<Avatar
					fallback={friend.friend.username[0]}
					hasStatus={true}
					src={friend.friend.avatar as string}
				/>
				<div className="right">
					<h5>
						{friend.friend.username}#{friend.friend.key}
					</h5>
					<p>
						Became friends{' '}
						<Moment fromNow>{friend.friendsSince}</Moment>
					</p>
				</div>
			</div>
			<div className="hr">
				<hr />
			</div>
		</div>
	);
};

export default User;
