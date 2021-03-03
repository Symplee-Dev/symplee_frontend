import { Avatar } from '@material-ui/core';
import { Maybe } from '../../../../graphql';

interface MessageProps {
	message: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: { id: number; username: string; avatar?: string };
	}>;
}

const Message = ({ message }: MessageProps) => {
	if (!message) return null;

	return (
		<div className="message-container">
			<div className="top">
				<Avatar src={message.author.avatar}>
					{message.author.username[0]}
				</Avatar>
				<h4>{message.author.username}</h4>
			</div>
			<div className="body">
				<p>{message.body}</p>
			</div>
		</div>
	);
};

export default Message;
