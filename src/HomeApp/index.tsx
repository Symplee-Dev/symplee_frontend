import Sidebar from './SideBar';
import './index.scss';
import { Route, Switch, useLocation } from 'react-router';
import HomeAppRoot from './views/HomeAppRoot';

const HomeApp = () => {
	document.body.classList.add('body-app');

	const location = useLocation();

	return (
		<div className="home-app">
			<Sidebar />
			<Switch location={location}>
				<Route path="/">
					<HomeAppRoot />
				</Route>
			</Switch>
		</div>
	);
};

export default HomeApp;
