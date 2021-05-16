import { useParams } from 'react-router';
import './style.scss';

const DMView = () => {
	const { chatId }: { chatId: string } = useParams();

	return <div className="dm-view"></div>;
};

export default DMView;
