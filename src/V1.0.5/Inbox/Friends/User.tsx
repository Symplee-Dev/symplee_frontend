import { Maybe } from '../../../graphql';
import { Avatar } from '../../components/Avatar/Avatar';
import Moment from 'react-moment';
import { Button } from '../../components';
import { UIActions } from '../../../redux/actions';

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
	const toggleModal = UIActions.useSetModalStatus(true);
	if (!friend || !friend?.friend) return null;

	return (
		<>
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
						{type === 'FRIEND' && (
							<p>
								Became friends <Moment fromNow>{friend.friendsSince}</Moment>
							</p>
						)}
					</div>
				</div>
				{type === 'FRIEND' && (
					<div className="right">
						<Button
							clickHandler={() => alert('not implemented')}
							content="Message"
							size="small"
							color="success"
						/>
						<Button
							clickHandler={() => {
								toggleModal();
							}}
							content="View"
							size="small"
							color="main"
						/>
					</div>
				)}
				{type === 'BLOCKED' && (
					<div className="right">
						<Button
							clickHandler={() => alert('not implemented')}
							content="Unblock"
							size="small"
							color="danger"
						/>
					</div>
				)}
			</div>

			<div className="hr">
				<hr />
			</div>
		</>
	);
};

export default User;
