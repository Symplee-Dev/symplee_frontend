import { Tooltip } from '@material-ui/core';
import { ChatGroupQuery, Exact, Maybe } from '../../../graphql';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CreateChatModal from './CreateChatModal';
import { useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';

const ChatGroupsList = ({
	chats,
	isAuthor,
	refetch,
	id
}: {
	id: number;
	chats:
		| Maybe<{
				id: number;
				name: string;
		  }>[]
		| undefined;
	isAuthor: boolean;
	refetch: (
		variables?:
			| Partial<
					Exact<{
						id: number;
					}>
			  >
			| undefined
	) => Promise<ApolloQueryResult<ChatGroupQuery>>;
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
				chatGroupId={id}
				open={createChatModal}
				setOpen={setCreateChatModal}
				refetch={refetch}
			/>
		</div>
	);
};

export default ChatGroupsList;
