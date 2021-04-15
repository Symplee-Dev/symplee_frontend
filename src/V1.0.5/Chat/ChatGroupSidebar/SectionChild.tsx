import { Maybe } from '../../../graphql';
import { useHistory } from 'react-router';

type SectionChildProps = {
	chat: Maybe<{
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
		mode: string;
	}>;
	active: boolean;
};

const SectionChild = ({ chat, active }: SectionChildProps) => {
	const history = useHistory();

	if (!chat || !chat.isPublic) return null;

	return (
		<div
			className={`section-child ${active && 'active'}`}
			onClick={() => history.push('/chat/message/' + chat.id)}
		>
			<p>
				<span className="hash">#</span> {chat.name}
			</p>
		</div>
	);
};

export default SectionChild;
