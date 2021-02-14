import React from 'react';

import { useHistory } from 'react-router';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
	const history = useHistory();

	const handleRoute = (e: React.MouseEvent, route: string) => {
		e.preventDefault();
		history.push(route);
	};
	return (
		<motion.div exit={{ opacity: 0 }} className="nav">
			<div className="logo">
				<h1>Bolt</h1>
				<FontAwesomeIcon
					icon={faBolt}
					onClick={e => handleRoute(e, '/')}
				/>
			</div>
			<div className="nav-links">
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<button onClick={e => handleRoute(e, '/signup')}>
					Get Started
				</button>
			</div>
		</motion.div>
	);
};

export default NavBar;
