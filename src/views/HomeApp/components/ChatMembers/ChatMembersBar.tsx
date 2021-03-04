import './style.scss';
import { UISelectors } from '../../../../redux/selectors';
import { useGetMembersQuery } from '../../../../graphql';
import { Skeleton } from '@material-ui/lab';
import ChatMemberRow from './ChatMemberRow';

const ChatMembersBar = () => {
	const chatGroupId = UISelectors.useSelectCurrentChatGroup()?.id;

	const { data, loading, error } = useGetMembersQuery({
		variables: { chatId: chatGroupId! }
	});

	if (loading) {
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
			{data?.getMembers.map((member, key) => (
				<ChatMemberRow member={member} key={key} />
			))}
		</div>
	);
};

export default ChatMembersBar;
