import { Maybe } from '../../../graphql';
import { useHistory } from 'react-router';
import { UISelectors } from '../../../redux/selectors';

type SectionChildProps = {
	chat: Maybe<{
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
		mode: string;
	}>;
};

const SectionChild = ({ chat }: SectionChildProps) => {
	const groupId = UISelectors.useSelectCurrentChatGroup()?.id;
	const history = useHistory();

	const currentchatid = UISelectors.useSelectCurrentChat();

	const active = chat?.id === currentchatid?.id;

	if (!chat || !chat.isPublic) return null;

	return (
		<div
			className={`section-child ${active && 'active'}`}
			onClick={() => history.push(`/chat/${groupId}/message/` + chat.id)}
		>
			<p>
				<span className="hash">#</span> {chat.name}
			</p>
		</div>
	);
};

export default SectionChild;
