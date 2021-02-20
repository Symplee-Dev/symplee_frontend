import { motion } from 'framer-motion';
const Header = ({ name }: { name: string }) => {
	return (
		<motion.div className="banner" exit={{ opacity: 0 }}>
			<div>
				<h2>Welcome to the {name} group</h2>
			</div>
		</motion.div>
	);
};

export default Header;
