import { Maybe } from '../../../../graphql';
import { Avatar } from '@material-ui/core';

const ChatMemberRow = ({
	member
}: {
	member: {
		id: number;
		username: string;
		avatar?: Maybe<string>;
		key: string;
	};
}) => {
	return (
		<div className="chat-member-row">
			<Avatar
				src={member.avatar}
				alt={member.username}
				style={{ width: '25px', height: '25px' }}
			>
				{member.username[0]}
			</Avatar>
			<p>
				{member.username}#{member.key}
			</p>
		</div>
	);
};

export default ChatMemberRow;
