import { Maybe } from '../../../graphql';
import { Avatar } from '../../components';
import Moment from 'react-moment';
const Message = ({
	message,
	showHeader = true
}: {
	message: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: {
			id: number;
			username: string;
			avatar?: string | undefined;
		};
	}>;
	showHeader?: boolean;
}) => {
	if (!message) return null;

	return (
		<div className="message">
			<div className="content-group">
				<div className="left">
					<Avatar
						fallback={message.author.username[0]}
						src={message.author.avatar ?? ''}
						hasStatus={false}
						className="medium"
					/>
				</div>
				<div className="middle">
					<div className="top">
						<h4>{message.author.username}</h4>
						<p>
							<Moment fromNow>{message.createdAt}</Moment>
						</p>
					</div>
					<div className="content">
						<p></p>
						{message.body}
					</div>
				</div>
			</div>
			<div className="right"></div>
		</div>
	);
};

export default Message;
