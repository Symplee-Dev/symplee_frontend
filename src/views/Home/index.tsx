import Navbar from '../../components/Navbar/NavBar';

import './style.scss';
import HomeWelcome from './HomeWelcome';
import HomeInfo from './HomeInfo';

const HomeView = () => {
	document.body.classList.remove('body-app');

	return (
		<div className="home-root">
			<Navbar />
			<HomeWelcome />
			<HomeInfo />
			<p style={{ opacity: 0.5, textAlign: 'center' }}>Symplee 2021</p>
		</div>
	);
};

export default HomeView;
