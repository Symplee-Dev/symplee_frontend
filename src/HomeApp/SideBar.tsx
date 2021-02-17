import FadeIn from 'react-fade-in';
import AppsIcon from '@material-ui/icons/Apps';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PublicIcon from '@material-ui/icons/Public';
//@ts-ignore
import { useUserQuery } from '../@types/graphql/generated.d.ts';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Avatar, SvgIconTypeMap, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router';
import randomHex from 'random-hex';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useLogout } from '../redux/actions';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const testGroups = [
	{
		id: 1,
		name: 'Boys 1',
		isPublic: true,
		createdAt: new Date(),
		chats: [
			{
				id: 1,
				name: 'channel 1',
				createdById: 1,
				messages: [
					{
						id: 1,
						body: 'Yo first message',
						chatId: 1,
						authorId: 1,
						createdAt: new Date()
					}
				]
			}
		]
	},
	{
		id: 2,
		name: 'Group 2',
		isPublic: true,
		createdAt: new Date(),
		chats: [
			{
				id: 1,
				name: 'channel 1',
				createdById: 1,
				messages: [
					{
						id: 1,
						body: 'Yo first message',
						chatId: 1,
						authorId: 1,
						createdAt: new Date()
					}
				]
			}
		]
	},
	{
		id: 3,
		name: 'Lambda 3',
		isPublic: true,
		createdAt: new Date(),
		chats: [
			{
				id: 1,
				name: 'channel 1',
				createdById: 1,
				messages: [
					{
						id: 1,
						body: 'Yo first message',
						chatId: 1,
						authorId: 1,
						createdAt: new Date()
					}
				]
			}
		]
	}
];

const NavComponent = ({
	route,
	pageState,
	tooltip,
	Icon
}: {
	route: string;
	pageState: string;
	tooltip: string;
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}) => {
	return (
		<Tooltip placement="right" title={tooltip}>
			<div
				className={`sidebar-section ${
					pageState === route && 'sidebar-active'
				}`}
			>
				<Icon
					className={`sidebar-icon ${
						pageState === route && 'active'
					}`}
				/>
			</div>
		</Tooltip>
	);
};

const Sidebar = () => {
	const location = useLocation();
	const history = useHistory();

	const [pageState, setPageState] = useState('');

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const logout = useLogout();

	const { data, loading, error } = useUserQuery({
		variables: { id: userId }
	});

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

	useEffect(() => {
		setPageState(window.location.pathname);
	}, [window.location.pathname]);

	return (
		<div className="sidebar hide-scrollbar">
			<FadeIn delay={100} className="sidebar-container">
				{links.map(link => (
					<NavComponent
						Icon={link.Icon}
						tooltip={link.tooltip}
						route={link.route}
						pageState={pageState}
					/>
				))}
				<div
					className="sidebar-section-logout"
					id="logout"
					onClick={() => logout()}
				>
					<ExitToAppIcon className="sidebar-icon" />
				</div>

				<h6 style={{ marginTop: '1.5rem' }}>Connect</h6>

				<>
					{testGroups.map(group => (
						<Tooltip title={group.name} placement="right">
							<div
								onClick={() =>
									history.push('/group/' + group.id)
								}
								key={group.id}
								className={`sidebar-avatar-section ${
									pageState === `/group/${group.id}` &&
									'sidebar-avatar-active'
								}`}
							>
								<Avatar
									alt={group.name}
									className={`sidebar-avatar ${
										pageState === `/group/${group.id}` &&
										'avatar-active'
									}`}
									style={{
										background: randomHex.generate()
									}}
								>
									{group.name[0]}
								</Avatar>
							</div>
						</Tooltip>
					))}
				</>

				<Tooltip title="Add Group" placement="right">
					<div className="sidebar-section ">
						<AddCircleIcon className="sidebar-icon" />
					</div>
				</Tooltip>
			</FadeIn>
		</div>
	);
};

export default Sidebar;
