import { NavLink } from 'react-router-dom';

const Footer = () => {
	return (
		<footer>
			<p>Symplee 2021</p>
			<NavLink to="/terms" id="ToS-link" target="blank">
				Terms of Services
			</NavLink>
		</footer>
	);
};

export default Footer;
