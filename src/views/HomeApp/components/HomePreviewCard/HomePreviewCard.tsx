import { useHistory } from 'react-router';
import './style.scss';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';

export interface HomePreviewCardProps {
	title: string;
	description: string;
	routeTo: string;
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const HomePreviewCard = ({
	title,
	routeTo,
	Icon,
	description
}: HomePreviewCardProps) => {
	const history = useHistory();

	return (
		<div className="home-preview-card">
			<div className="top">
				<h3>{title}</h3>
				<Icon />
			</div>
			<p className="description">{description}</p>
			<div className="go-to" onClick={() => history.push(routeTo)}>
				<p>Go</p>
				<ArrowForwardSharpIcon />
			</div>
		</div>
	);
};

export default HomePreviewCard;
