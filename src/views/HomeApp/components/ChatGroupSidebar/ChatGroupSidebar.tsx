import './styles.scss';
import { UISelectors } from '../../../../redux/selectors';
import { CircularProgress, Avatar } from '@material-ui/core';
import ChatGroupSidebarChat from './ChatGroupSidebarChat';

// Icons
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';

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
				<div className="sidebar-chats">
					<div className="chats-actions">
						<div className="sidebar-btn">
							<CreateSharpIcon />
						</div>
						<div className="sidebar-btn">
							<HomeSharpIcon />
						</div>
					</div>
					<hr />
					{group.chats.map((chat, key) => (
						<ChatGroupSidebarChat chat={chat} key={key} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ChatGroupSidebar;
