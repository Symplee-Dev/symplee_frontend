import './style.scss';
import { UISelectors } from '../../../../redux/selectors';
import { useGetMembersQuery } from '../../../../graphql';
import { Skeleton } from '@material-ui/lab';
import ChatMemberRow from './ChatMemberRow';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const ChatMembersBar = () => {
	const chatGroupId = UISelectors.useSelectCurrentChatGroup()?.id;
	const params: { groupId: string | undefined } = useParams();

	const { data, loading, error, refetch } = useGetMembersQuery({
		variables: { chatId: chatGroupId ?? Number(params.groupId) }
	});

	useEffect(() => {
		refetch();
	}, [chatGroupId, refetch]);

	if (loading || !data) {
		return (
			<div className="chat-members-bar">
				<h4>Members</h4>
				<Skeleton height={50} />
				<Skeleton height={50} />
				<Skeleton height={50} />
				<Skeleton height={50} />
				<Skeleton height={50} />
				<Skeleton height={50} />
				<Skeleton height={50} />
			</div>
		);
	}

	return (
		<div className="chat-members-bar">
			<h4>Members</h4>
			<>
				{data?.getMembers.map((member, key) => (
					<ChatMemberRow member={member} key={key} />
				))}
			</>
		</div>
	);
};

export default ChatMembersBar;
