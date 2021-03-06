import { Avatar } from '@material-ui/core';
import { Maybe } from '../../../../graphql';
import Moment from 'react-moment';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { UserSelectors } from '../../../../redux/selectors';

interface MessageProps {
	message: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: { id: number; username: string; avatar?: string };
	}>;
	noHeader?: boolean;
}

const Message = ({ message, noHeader = false }: MessageProps) => {
	const userId = UserSelectors.useSelectUserId();

	if (!message) return null;

	return (
		<div
			className="message-container"
			style={{
				paddingTop: noHeader ? '0 !important' : '1rem',
				paddingLeft: '1rem'
			}}
		>
			{!noHeader && (
				<div className="top">
					<div className="left">
						<Avatar src={message.author.avatar}>
							{message.author.username[0]}
						</Avatar>
						<h4>{message.author.username}</h4>
						<p>
							<Moment fromNow={true} ago>
								{new Date(message.createdAt)}
							</Moment>{' '}
							ago
						</p>
					</div>
					<div className="right">
						{userId === message.author.id && (
							<div className="chat-actions">
								<MoreVertSharpIcon />
							</div>
						)}
					</div>
				</div>
			)}
			<div className="body">
				<p>{message.body}</p>
			</div>
		</div>
	);
};

export default Message;
