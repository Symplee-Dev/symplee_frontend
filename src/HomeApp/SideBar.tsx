import FadeIn from 'react-fade-in';
import AppsIcon from '@material-ui/icons/Apps';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PublicIcon from '@material-ui/icons/Public';

const testGroups = [
	{
		id: 1,
		name: 'Group 1',
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
		name: 'Group 3',
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

const Sidebar = () => {
	const location = useLocation();

	const [pageState, setPageState] = useState('');

	useEffect(() => {
		setPageState(location.pathname);
	}, [location]);

	return (
		<div className="sidebar hide-scrollbar">
			<FadeIn delay={100} className="sidebar-container">
				<h6>Quick Menu</h6>
				<div
					className={`sidebar-section ${
						pageState === '/' && 'sidebar-active'
					}`}
				>
					<AppsIcon
						className={`sidebar-icon ${
							pageState === '/' && 'active'
						}`}
					/>
					<p>Home</p>
				</div>
				<div
					className={`sidebar-section ${
						pageState === '/settings' && 'sidebar-active'
					}`}
				>
					<SettingsIcon
						className={`sidebar-icon ${
							pageState === '/settings' && 'active'
						}`}
					/>
					<p>Settings</p>
				</div>
				<div
					className={`sidebar-section ${
						pageState === '/you' && 'sidebar-active'
					}`}
				>
					<AccountBoxIcon
						className={`sidebar-icon ${
							pageState === '/you' && 'active'
						}`}
					/>
					<p>You</p>
				</div>

				<div
					className={`sidebar-section ${
						pageState === '/discover' && 'sidebar-active'
					}`}
				>
					<PublicIcon
						className={`sidebar-icon ${
							pageState === '/discover' && 'active'
						}`}
					/>
					<p>Discover</p>
				</div>

				<h6 style={{ marginTop: '1.5rem' }}>Chat Groups </h6>

				{testGroups.map(group => (
					<>
						<div
							className={`sidebar-section ${
								pageState === `/group/${group.id}` &&
								'sidebar-active'
							}`}
						>
							<ChatBubbleIcon
								className={`sidebar-icon ${
									pageState === `'/group/${group.id}` &&
									'active'
								}`}
							/>
							<p>{group.name}</p>
						</div>
					</>
				))}

				<div className="sidebar-section ">
					<AddCircleIcon className="sidebar-icon" />
					<p>Add</p>
				</div>
			</FadeIn>
		</div>
	);
};

export default Sidebar;
