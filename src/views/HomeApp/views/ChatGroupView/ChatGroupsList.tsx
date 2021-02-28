import { Tooltip } from '@material-ui/core';
import { ChatGroupQuery, Exact, Maybe } from '../../../../graphql';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CreateChatModal from './CreateChatModal';
import { useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import MembersBar from './MembersBar';
import { useHistory } from 'react-router';

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
				icon: string;
				isPublic: boolean;
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

	const history = useHistory();

	return (
		<div className="chat-group-list-root">
			<div className="chat-group-list">
				{chats?.map(chat => {
					return (
						<div
							className="chat-div chat"
							key={chat?.id}
							onClick={() =>
								history.push(`/group/${id}/chat/${chat?.id}`)
							}
						>
							<p>#{chat?.name}</p>
							<p>{chat?.icon}</p>
						</div>
					);
				})}

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
				{chats && chats.length <= 0 && (
					<div className="no-chats">
						<p>0 chats available</p>
						<SentimentVeryDissatisfiedIcon className="icon" />
					</div>
				)}
				<CreateChatModal
					chatGroupId={id}
					open={createChatModal}
					setOpen={setCreateChatModal}
					refetch={refetch}
				/>
			</div>
			<MembersBar chatGroupId={id} />
		</div>
	);
};

export default ChatGroupsList;
