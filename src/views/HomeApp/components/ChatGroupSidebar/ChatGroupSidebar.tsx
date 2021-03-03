import './styles.scss';
import { UISelectors } from '../../../../redux/selectors';
import { CircularProgress, Avatar } from '@material-ui/core';

const ChatGroupSidebar = () => {
	const group = UISelectors.useSelectCurrentChatGroup();

	if (!group)
		return (
			<div className="chat-group-sidebar">
				<CircularProgress />
			</div>
		);

	return (
		<div className="chat-group-sidebar">
			<div className="top">
				<h3>{group.name}</h3>
				<Avatar
					variant="rounded"
					src={group.avatar}
					style={{ width: '35px', height: '30px' }}
				>
					{group.name[0]}
				</Avatar>
			</div>
			<div className="content">
				<h4>Channels</h4>
			</div>
		</div>
	);
};

export default ChatGroupSidebar;
