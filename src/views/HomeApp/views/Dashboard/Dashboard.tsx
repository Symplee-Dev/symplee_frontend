import './style.scss';

import Home from './Home';
import Friends from './Friends';

const Dashbaord = ({ route }: { route: string }) => {
	return (
		<div className="dashboard">
			{route === 'ROOT' && <Home />} {route === 'FRIENDS' && <Friends />}
		</div>
	);
};

export default Dashbaord;
