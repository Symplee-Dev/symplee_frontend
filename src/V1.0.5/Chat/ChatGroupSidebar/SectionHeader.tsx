import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SectionHeaderProps = {
	actionHandler: () => void;
	content: string;
};

const SectionHeader = ({ actionHandler, content }: SectionHeaderProps) => {
	return (
		<div className="section-header">
			<p>{content}</p>
			<FontAwesomeIcon icon={faPlus} className="heder-icon" />
		</div>
	);
};

export default SectionHeader;
