import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SectionHeaderProps = {
	actionHandler: () => void;
	content: string;
	hasAction?: boolean;
};

const SectionHeader = ({
	actionHandler,
	content,
	hasAction = false
}: SectionHeaderProps) => {
	return (
		<div className="section-header">
			<p>{content}</p>
			{hasAction && <FontAwesomeIcon icon={faPlus} className="header-icon" />}
		</div>
	);
};

export default SectionHeader;
