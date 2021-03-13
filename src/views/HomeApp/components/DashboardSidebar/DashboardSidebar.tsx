import { useHistory } from 'react-router';
import './style.scss';

const DashboardSidebar = ({
	route,
	setRoute
}: {
	route: string;
	setRoute: React.Dispatch<
		React.SetStateAction<'ROOT' | 'MESSAGES' | 'FRIENDS' | 'TEAMS'>
	>;
}) => {
	const history = useHistory();

	return (
		<div className="dashboard-sidebar">
			<div className="top">
				<h3>Dashboard</h3>
			</div>
			<div className="content">
				<h4>Home</h4>
				<div className="tabs">
					<div
						className={`tab ${route === 'ROOT' && 'active'}`}
						onClick={() => {
							history.push('/');
							setRoute('ROOT');
						}}
					>
						<p>Dashboard</p>
					</div>
					<div
						className={`tab ${route === 'MESSAGES' && 'active'}`}
						onClick={() => {
							history.push('/');
							setRoute('MESSAGES');
						}}
					>
						<p>Direct Messages</p>
					</div>
					<div
						className={`tab ${route === 'FRIENDS' && 'active'}`}
						onClick={() => {
							history.push('/');
							setRoute('FRIENDS');
						}}
					>
						<p>Friends</p>
					</div>
					<div
						className={`tab ${route === 'TEAMS' && 'active'}`}
						onClick={() => {
							history.push('/');
							setRoute('TEAMS');
						}}
					>
						<p>Teams</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardSidebar;
