import React from 'react';
import './style.scss';
import Navbar from '../../components/NavBar';
import heroimg from './hero.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in';

interface HomeViewProps {}

const HomeView: React.FC<HomeViewProps> = () => {
	return (
		<>
			<Navbar />
			<div className="home-root">
				<div className="left">
					<FadeIn delay={300}>
						<h2>
							Say Hello To{' '}
							<span className="logo">
								BOLT <FontAwesomeIcon icon={faBolt} />
							</span>
						</h2>
						<hr />
						<p>
							Bolt is the all new chat app that brings together
							both teams and communities. With bolt you can use it
							however you like, whether it's managing a team, or
							building a community. Bolt has the tools to help you
							get started lightning fast.
						</p>
						<button>Join Now</button>
					</FadeIn>
				</div>
				<div className="right">
					<FadeIn delay={300}>
						<img
							className="hero-image"
							src={heroimg}
							alt="Man chatting"
						/>
					</FadeIn>
				</div>
			</div>
		</>
	);
};

export default HomeView;
