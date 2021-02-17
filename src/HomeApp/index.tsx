import Sidebar from './SideBar';
import './index.scss';

const HomeApp = () => {
	document.body.classList.add('body-app');

	return (
		<div className="home-app">
			<Sidebar />
		</div>
	);
};

export default HomeApp;
