import FadeIn from 'react-fade-in';
import AppsIcon from '@material-ui/icons/Apps';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PublicIcon from '@material-ui/icons/Public';
//@ts-ignore
import { useUserQuery } from '../@types/graphql/generated.d.ts';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Avatar, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router';
import randomHex from 'random-hex';

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

const Sidebar = () => {
	const location = useLocation();
	const history = useHistory();

	const [pageState, setPageState] = useState('');

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	const { data, loading, error } = useUserQuery({
		variables: { id: userId }
	});

	useEffect(() => {
		setPageState(window.location.pathname);
	});

	return (
		<div className="sidebar hide-scrollbar">
			<FadeIn delay={100} className="sidebar-container">
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

				<div className="sidebar-section ">
					<AddCircleIcon className="sidebar-icon" />
				</div>
			</FadeIn>
		</div>
	);
};

export default Sidebar;
