import { useHistory } from 'react-router';
import './style.scss';

export interface HomePreviewCardProps {
	title: string;
	routeTo: string;
	image: string;
}

const HomePreviewCard = ({title} : HomePreviewCardProps) => {
  const history = useHistory()

	return (
    <div className="home-preview-card" onClick={() => }>
    <h3>{title}</h3>
    
  </div>
  )
};

export default HomePreviewCard;
