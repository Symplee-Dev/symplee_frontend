import { Avatar } from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import { Maybe } from 'graphql/jsutils/Maybe';
import Moment from 'react-moment';

interface RecentProps {
	user: {
		friendsSince: string;
		friend?: Maybe<{
			id: number;
			username: string;
			key: string;
			is_online: boolean;
			avatar?: Maybe<string>;
		}>;
	};
}

const Recent = ({ user }: RecentProps) => {
	return (
		<div className="recent">
			<Avatar
				src={user.friend?.avatar ?? ''}
				fallback={user.friend?.username[0] ?? ''}
				hasStatus={true}
				className="large"
			/>
			<h4>
				{user.friend?.username}#{user.friend?.key}
			</h4>
			<p className="subtitle">
				Became friends <Moment fromNow>{user.friendsSince}</Moment>
			</p>

			<Button
				clickHandler={() => alert('Not implemented')}
				content="Message"
				size="large"
				color="success"
			/>
		</div>
	);
};

export default Recent;
