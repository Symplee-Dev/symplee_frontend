import { Maybe } from '../../../graphql';

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
	if (!chat || !chat.isPublic) return null;

	return (
		<div className={`section-child ${active && 'active'}`}>
			<p>
				<span className="hash">#</span> {chat.name}
			</p>
		</div>
	);
};

export default SectionChild;
