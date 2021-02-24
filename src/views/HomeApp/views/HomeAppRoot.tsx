import { motion } from 'framer-motion';
import { useHistory } from 'react-router';

const HomeAppRoot = ({ user }: { user: { username: string; key: string } }) => {
	const history = useHistory();

	return (
		<motion.div className="home-app-root" exit={{ opacity: 0 }}>
			<div className="banner">
				<h2>Dashboard</h2>
				<p>
					Welcome Back, {user.username}#{user.key}
				</p>
			</div>
			<div className="body">
				<div
					className="body-section"
					id="a"
					onClick={() => {
						history.push('/news');
					}}
				>
					<h3>News And Articles</h3>
					<p>Your subscribed daily content</p>
				</div>
				<div
					className="body-section"
					id="b"
					onClick={() => history.push('/boltplus')}
				>
					<h3>Bolt Plus+</h3>
					<p>Learn more about features included with Bolt+</p>
				</div>
				<div
					className="body-section"
					id="c"
					onClick={() => history.push('/community')}
				>
					<h3>Community</h3>
					<p>Top posts curated by the Bolt community</p>
				</div>
			</div>
		</motion.div>
	);
};

export default HomeAppRoot;
