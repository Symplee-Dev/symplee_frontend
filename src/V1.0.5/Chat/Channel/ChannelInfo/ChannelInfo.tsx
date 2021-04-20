import './style.scss';
import { UISelectors } from '../../../../redux/selectors';
import { useGetMembersQuery } from '../../../../graphql';
import { Avatar } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ChannelInfo = ({
	setChannelInfoOpen
}: {
	setChannelInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chat = UISelectors.useSelectCurrentChatGroup()!;

	const { data } = useGetMembersQuery({
		skip: !chat,
		variables: { chatId: chat.id }
	});

	return (
		<div className="channel-info">
			<div className="top">
				<FontAwesomeIcon
					icon={faTimes}
					onClick={() => setChannelInfoOpen(false)}
				/>
			</div>
			<div className="announcements">
				<h4>ANNOUNCEMENTS</h4>
				<p>There are no announcements yet</p>
			</div>
			<div className="members">
				<h4>MEMBERS</h4>
				{data?.getMembers.map((member, key) => (
					<div className="member" key={key}>
						<Avatar
							className="small"
							fallback={member.username[0]}
							src={member.avatar ?? ''}
							hasStatus={true}
						/>
						<p className="name">
							{member.username}#{member.key}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChannelInfo;
