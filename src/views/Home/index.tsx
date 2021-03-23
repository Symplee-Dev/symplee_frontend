import Navbar from '../../components/Navbar/NavBar';
import heroimg from '../../assets/team.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in';
import './style.scss';

const HomeView = () => {
	document.body.classList.remove('body-app');

	// return (
	// 	<>
	// 		<Navbar />
	// 		<div className="home-root">
	// 			<div className="left">
	// 				<FadeIn delay={300}>
	// 					<h2>
	// 						Say hello to your new favorite cross between your{' '}
	// 						<span className="highlight">work</span> life and{' '}
	// 						<span className="highlight">social</span> life.
	// 					</h2>
	// 					<p>
	// 						Symplee is the all new chat app that brings together
	// 						both teams and communities. With Symplee you can use
	// 						it however you like, whether it's managing a team,
	// 						or building a community from anywhere available
	// 						whether you want it on your desktop or the web.
	// 					</p>
	// 					<button
	// 						onClick={() =>
	// 							window.open(
	// 								'https://hazel.symplee.app/download',
	// 								'_blank'
	// 							)
	// 						}
	// 					>
	// 						Download For Windows{''}
	// 						<FontAwesomeIcon icon={faDownload} />
	// 					</button>
	// 				</FadeIn>
	// 			</div>
	// 			<div className="right">
	// 				<img src={heroimg} alt="team" />
	// 			</div>
	// 		</div>

	// 	</>
	// );

	return (
		<div className="home-root">
			<Navbar />
		</div>
	);
};

export default HomeView;
