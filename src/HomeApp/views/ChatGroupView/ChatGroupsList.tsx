import { Tooltip } from '@material-ui/core';
import { Maybe } from '../../../graphql';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CreateChatModal from './CreateChatModal';
import { useState } from 'react';

const ChatGroupsList = ({
	chats,
	isAuthor
}: {
	chats:
		| Maybe<{
				id: number;
				name: string;
		  }>[]
		| undefined;
	isAuthor: boolean;
}) => {
	const [createChatModal, setCreateChatModal] = useState(false);

	return (
		<div className="chat-group-list">
			{chats?.map(chat => {
				return (
					<div className="chat-div chat" key={chat?.id}>
						{chat?.name}
					</div>
				);
			})}
			{chats && chats.length <= 0 && (
				<div className="no-chats">
					<p>0 chats available</p>
					<SentimentVeryDissatisfiedIcon className="icon" />
				</div>
			)}
			{isAuthor && (
				<Tooltip title="Create a new chat">
					<div
						className="chat-div create-chat"
						onClick={() => setCreateChatModal(true)}
					>
						+
					</div>
				</Tooltip>
			)}
			<CreateChatModal
				open={createChatModal}
				setOpen={setCreateChatModal}
			/>
		</div>
	);
};

export default ChatGroupsList;
