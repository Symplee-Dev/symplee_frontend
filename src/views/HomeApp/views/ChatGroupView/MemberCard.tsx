import { Avatar } from '@material-ui/core';

const MemberCard = ({
	user
}: {
	user: { username: string; key: string; avatar: string };
}) => {
	return (
		<div className="member-card">
			<Avatar src={user.avatar}>{user.username[0]}</Avatar>
			<p>
				{user.username}#{user.key}
			</p>
		</div>
	);
};

export default MemberCard;
