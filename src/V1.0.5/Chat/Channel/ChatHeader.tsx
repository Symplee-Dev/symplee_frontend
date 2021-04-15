import './ChatHeader.scss';
import { UISelectors } from '../../../redux/selectors';
import { useGetMembersQuery } from '../../../graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCog,
	faEllipsisV,
	faInfoCircle,
	faMapPin,
	faPlus,
	faStar
} from '@fortawesome/free-solid-svg-icons';

const ChatHeader = () => {
	const chat = UISelectors.useSelectCurrentChat()!;

	const { data } = useGetMembersQuery({
		skip: !chat,
		variables: { chatId: chat.id }
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
					<p className="create-invite">
						Create Invite <FontAwesomeIcon icon={faPlus} className="icon" />
					</p>
				</div>
			</div>
			<div className="right">
				<FontAwesomeIcon icon={faMapPin} className="icon" />
				<FontAwesomeIcon icon={faInfoCircle} className="icon" />
				<FontAwesomeIcon icon={faStar} className="icon" />
				<div className="vertical-rule"></div>
				<FontAwesomeIcon icon={faCog} className="icon" />

				<FontAwesomeIcon icon={faEllipsisV} className="icon" />
			</div>
		</div>
	);
};

export default ChatHeader;
