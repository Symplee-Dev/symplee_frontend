import './styles.scss';
import { UISelectors, UserSelectors } from '../../../../redux/selectors';
import { CircularProgress, Avatar } from '@material-ui/core';
import ChatGroupSidebarChat from './ChatGroupSidebarChat';

// Icons
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import LinkSharpIcon from '@material-ui/icons/LinkSharp';
import { useState } from 'react';

const ChatGroupSidebar = ({
	setCreatingInvite
}: {
	setCreatingInvite: (val: boolean) => void;
}) => {
	const group = UISelectors.useSelectCurrentChatGroup();
	const userId = UserSelectors.useSelectUserId();

	const [el, setEl] = useState<HTMLDivElement | null>(null);

	const pos = localStorage.getItem('CG_SIDEBAR_SCROLLPOS');
	if (pos !== null) {
		if (el) {
			el.scrollTop = parseInt(pos, 10);
		}
	}

	const handleSet = () => {
		if (el) {
			localStorage.setItem(
				'CG_SIDEBAR_SCROLLPOS',
				el.scrollTop.toString()
			);
		}
	};

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
				{group.isPublic && !(group.createdBy === userId) && (
					<button
						className="create-invite"
						onClick={() => setCreatingInvite(true)}
					>
						Create Invite <LinkSharpIcon />
					</button>
				)}
				{group.createdBy === userId && (
					<button
						className="create-invite"
						onClick={() => setCreatingInvite(true)}
					>
						Create Invite <LinkSharpIcon />
					</button>
				)}
				<h4>Channels</h4>
				<div className="sidebar-chats" ref={el => setEl(el)}>
					<div className="chats-actions">
						<div className="sidebar-btn">
							<CreateSharpIcon />
						</div>
						<div className="sidebar-btn">
							<HomeSharpIcon />
						</div>
					</div>
					<hr />
					<>
						{group.chats.map((chat, key) => (
							<ChatGroupSidebarChat
								chat={chat}
								key={key}
								onClick={handleSet}
							/>
						))}
					</>
				</div>
			</div>
		</div>
	);
};

export default ChatGroupSidebar;
