import './Home.scss';
import { NavSidebar } from '../NavSidebar/NavSidebar';

export const Home = ({ isElectron }: { isElectron: boolean }) => {
	return (
		<div className="home" style={{ height: isElectron ? '98vh' : '100vh' }}>
			<div className={`layout ${isElectron ? '' : 'layout-max'}`}>
				<NavSidebar />
			</div>
		</div>
	);
};
