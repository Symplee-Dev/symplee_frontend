import { faDoorOpen, faDownload } from '@fortawesome/free-solid-svg-icons';
import Hero from './Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';

const HomeWelcome = () => {
	const history = useHistory();

	return (
		<div className="home-welcome">
			<div className="top">
				<h5>TALK. CHAT. COLLABORATE.</h5>
				<h1>Symplee</h1>
				<div className="action-buttons">
					<button
						onClick={() =>
							window.open(
								'https://hazel.symplee.app/download',
								'_blank'
							)
						}
					>
						<FontAwesomeIcon icon={faDownload} /> Download for
						Windows
					</button>
					<button onClick={() => history.push('/login')}>
						{' '}
						<FontAwesomeIcon icon={faDoorOpen} /> Open in your
						browser
					</button>
				</div>
				<a href="#home-info">Learn More</a>
			</div>

			<Hero />
		</div>
	);
};

export default HomeWelcome;
