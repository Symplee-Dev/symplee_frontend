import Navbar from '../../components/Navbar/NavBar';

import './style.scss';
import HomeWelcome from './HomeWelcome';
import HomeInfo from './HomeInfo';
import Footer from './Footer';

const HomeView = () => {
	document.body.classList.remove('body-app');

	return (
		<div className="home-root">
			<Navbar />
			<HomeWelcome />
			<HomeInfo />
			<Footer />
		</div>
	);
};

export default HomeView;
