import './ChatHeader.scss';
import { UISelectors } from '../../../redux/selectors';
import { useGetMembersQuery } from '../../../graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CreateInviteDrawer from './CreateInviteDrawer/CreateInviteDrawer';
import {
	faCog,
	faEllipsisV,
	faInfoCircle,
	faMapPin,
	faPlus,
	faStar
} from '@fortawesome/free-solid-svg-icons';

const ChatHeader = ({
	channelInfoOpen,
	setChannelInfoOpen
}: {
	channelInfoOpen: boolean;
	setChannelInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = UISelectors.useSelectCurrentChat()!;
	const chatgroupid = UISelectors.useSelectCurrentChatGroup()!;
	const [inviteDrawerOpen, setInviteDrawerOpen] = useState(false);

	const { data } = useGetMembersQuery({
		skip: !chat,
		variables: { chatId: chatgroupid.id }
	});

	return (
		<div className="chat-header">
			<div className="left">
				<h4>
					<span className="tag">#</span>
					{chat?.name} {chat?.icon}
				</h4>
				<div className="left-bottom">
					<p className="members">{data?.getMembers.length} members</p>
					<p
						className="create-invite"
						onClick={() => setInviteDrawerOpen(true)}
					>
						Create Invite <FontAwesomeIcon icon={faPlus} className="icon" />
					</p>
					<CreateInviteDrawer
						open={inviteDrawerOpen}
						setOpen={setInviteDrawerOpen}
					/>
				</div>
			</div>
			<div className="right">
				<FontAwesomeIcon icon={faMapPin} className="icon" />
				<FontAwesomeIcon
					icon={faInfoCircle}
					className="icon"
					onClick={() => setChannelInfoOpen(!channelInfoOpen)}
				/>
				<FontAwesomeIcon icon={faStar} className="icon" />
				<div className="vertical-rule"></div>
				<FontAwesomeIcon icon={faCog} className="icon" />

				<FontAwesomeIcon icon={faEllipsisV} className="icon" />
			</div>
		</div>
	);
};

export default ChatHeader;
