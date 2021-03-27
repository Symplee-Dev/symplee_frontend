import NavBar from '../../components/Navbar/NavBar';
import ToS from '../../components/ToS';
import './style.scss';

const TermView = () => {
	return (
		<div className="tos">
			<NavBar />
			<div className="tos_conatainer">
				<ToS />
			</div>
		</div>
	);
};

export default TermView;
