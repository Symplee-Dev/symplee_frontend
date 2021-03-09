import './style.scss';

import Home from './Home';

const Dashbaord = ({ route }: { route: string }) => {
	return <div className="dashboard">{route === 'ROOT' && <Home />}</div>;
};

export default Dashbaord;
