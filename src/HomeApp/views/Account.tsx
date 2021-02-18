import { User } from '../../@types/graphql/generated';
import { motion } from 'framer-motion';
import './account.scss';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Avatar, Tooltip, TextField } from '@material-ui/core';
import randomHex from 'random-hex';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Moment from 'react-moment';
import { useState, useEffect } from 'react';
import UndoIcon from '@material-ui/icons/Undo';

const Account = ({ user }: { user: User }) => {
	const [formState, setFormState] = useState<{
		name: string;
		username: string;
		email: string;
	}>({ name: '', username: '', email: '' });

	useEffect(() => {
		setFormState({
			name: user.name,
			username: user.username,
			email: user.email
		});
	}, [user]);

	return (
		<motion.div exit={{ opacity: 0 }} className="account">
			<div className="banner">
				<div>
					<h2>Account</h2> <AccountBoxIcon className="icon" />
				</div>
				<p>Edit and view your account</p>
			</div>
			<div className="body">
				<div className="top">
					<div className="top-top">
						<Avatar style={{ background: randomHex.generate() }}>
							{user.username[0]}
						</Avatar>
						<h2 className="username">
							{user.username}#{user.key}
						</h2>

						<Tooltip
							placement="top"
							title="Verified Member"
							className="verified"
						>
							<VerifiedUserIcon />
						</Tooltip>
					</div>
					<div className="joined">
						Joined{' '}
						<Moment fromNow={true} ago>
							{new Date(user.createdAt)}
						</Moment>{' '}
						ago
					</div>
				</div>

				<div className="top-bottom">
					<h2>Profile Details</h2>

					<div className="row">
						<div>
							<p>Name </p>
							{user.name === formState.name ? (
								''
							) : (
								<Tooltip placement="top" title="Undo">
									<UndoIcon
										className="undo"
										style={{ color: '#F2A813' }}
										onClick={() =>
											setFormState({
												...formState,
												name: user.name
											})
										}
									/>
								</Tooltip>
							)}
						</div>
						<TextField
							color="primary"
							style={{ width: '100%' }}
							onChange={e =>
								setFormState({
									...formState,
									name: e.target.value
								})
							}
							variant="filled"
							value={formState?.name}
							inputProps={{ className: 'input-field' }}
						/>
					</div>
					<div className="row">
						<div>
							<p>Email</p>
							{user.email === formState.email ? (
								''
							) : (
								<Tooltip placement="top" title="Undo">
									<UndoIcon
										className="undo"
										style={{ color: '#F2A813' }}
										onClick={() =>
											setFormState({
												...formState,
												email: user.email
											})
										}
									/>
								</Tooltip>
							)}
						</div>
						<TextField
							color="primary"
							style={{ width: '100%' }}
							variant="filled"
							value={formState?.email}
							onChange={e =>
								setFormState({
									...formState,
									email: e.target.value
								})
							}
							inputProps={{ className: 'input-field' }}
						/>
					</div>
					<div className="row">
						<div>
							<p>Username</p>
							{user.username === formState.username ? (
								''
							) : (
								<Tooltip placement="top" title="Undo">
									<UndoIcon
										className="undo"
										style={{ color: '#F2A813' }}
										onClick={() =>
											setFormState({
												...formState,
												username: user.username
											})
										}
									/>
								</Tooltip>
							)}
						</div>
						<TextField
							style={{ width: '100%' }}
							onChange={e =>
								setFormState({
									...formState,
									username: e.target.value
								})
							}
							color="primary"
							variant="filled"
							value={formState?.username}
							inputProps={{ className: 'input-field' }}
						/>
					</div>
					<div className="row">
						<button>Save</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Account;
