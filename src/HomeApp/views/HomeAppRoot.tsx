import { TextField } from '@material-ui/core';
import { motion } from 'framer-motion';

const HomeAppRoot = () => {
	return (
		<motion.div className="home-app-root" exit={{ opacity: 0 }}>
			<div className="banner">
				<h2>Dashboard</h2>
			</div>
			<div className="body">
				<div className="friends">
					<h3>Friends - 0 friends online</h3>
				</div>
				<div className="right">
					<div className="friends">
						<h3>Bolt Rank</h3>
					</div>
					<div className="friends">
						<h3>Global Bolt Rank</h3>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default HomeAppRoot;
