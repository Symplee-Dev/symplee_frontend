import AppsIcon from '@material-ui/icons/Apps';
import { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PublicIcon from '@material-ui/icons/Public';

import { Avatar, SvgIconTypeMap, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router';
import randomHex from 'random-hex';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { UserActions } from '../../redux/actions/index';

const links: {
	route: string;
	tooltip: string;
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}[] = [
	{ Icon: AppsIcon, route: '/', tooltip: 'Dashboard' },
	{ Icon: SettingsIcon, route: '/settings', tooltip: 'Settings' },
	{ Icon: AccountBoxIcon, route: '/you', tooltip: 'Your Account' },
	{ Icon: PublicIcon, route: '/discover', tooltip: 'Discover' }
];

const NavComponent = ({
	route,
	pageState,
	tooltip,
	Icon,
	history
}: {
	route: string;
	pageState: (path: string) => void;
	tooltip: string;
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
	history: any;
}) => {
	return (
		<Tooltip placement="right" title={tooltip}>
			<div
				onClick={() => {
					history.push(route);
					pageState(route);
				}}
				className={`sidebar-section ${
					window.location.pathname === route && 'sidebar-active'
				}`}
			>
				<Icon
					className={`sidebar-icon ${
						window.location.pathname === route && 'active'
					}`}
				/>
			</div>
		</Tooltip>
	);
};

const Sidebar = ({
	chatGroups
}: {
	chatGroups: { name: string; id: number; avatar?: string }[];
}) => {
	const history = useHistory();

	const [pageState, setPageState] = useState('');

	const logout = UserActions.useLogout();

	let navLinks = links.map(link => (
		<NavComponent
			key={link.route}
			history={history}
			Icon={link.Icon}
			tooltip={link.tooltip}
			route={link.route}
			pageState={(path: string) => setPageState(path)}
		/>
	));

	return (
		<div className="sidebar hide-scrollbar">
			<div className="sidebar-container">
				{navLinks}
				<Tooltip placement="right" title="Logout">
					<div
						className="sidebar-section-logout"
						id="logout"
						onClick={() => logout()}
					>
						<ExitToAppIcon className="sidebar-icon" />
					</div>
				</Tooltip>

				<h6 style={{ marginTop: '1.5rem' }}>Connect</h6>

				<>
					{chatGroups.map(group => (
						<Tooltip
							title={group.name}
							placement="right"
							key={group.id}
						>
							<div
								onClick={() => {
									history.push('/group/' + group.id);
									setPageState('/group/' + group.id);
								}}
								key={group.id}
								className={`sidebar-avatar-section ${
									pageState === `/group/${group.id}` &&
									'sidebar-avatar-active'
								}`}
							>
								{!group.avatar ? (
									<Avatar
										alt={group.name}
										className={`sidebar-avatar ${
											pageState ===
												`/group/${group.id}` &&
											'avatar-active'
										}`}
										style={{
											background: randomHex.generate()
										}}
									>
										{group.name[0]}
									</Avatar>
								) : (
									<Avatar
										alt={group.name}
										className={`sidebar-avatar ${
											pageState ===
												`/group/${group.id}` &&
											'avatar-active'
										}`}
										src={group.avatar}
									/>
								)}
							</div>
						</Tooltip>
					))}
				</>

				<Tooltip title="Add Group" placement="right">
					<div
						className="sidebar-section add"
						onClick={() => history.push('/group/create')}
					>
						<AddCircleIcon className="sidebar-icon" />
					</div>
				</Tooltip>
			</div>
		</div>
	);
};

export default Sidebar;
