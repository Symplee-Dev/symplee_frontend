import './style.scss';

import Home from './Home';
import Friends from './Friends';

<<<<<<< HEAD
// import Messages from './Messages';
=======
import Messages from './Messages';
import { UIActions } from '../../../../redux/actions/index';
>>>>>>> dev

const Dashbaord = ({ route }: { route: string }) => {
	const clearChat = UIActions.useClearCurrentChat();
	clearChat();
	return (
		<div className="dashboard">
			{route === 'ROOT' && <Home />} {route === 'FRIENDS' && <Friends />}{' '}
		</div>
	);
};

export default Dashbaord;
