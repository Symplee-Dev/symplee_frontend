import { User } from '../../@types/graphql/generated';
import { motion } from 'framer-motion';
import './account.scss';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Avatar, Tooltip, TextField } from '@material-ui/core';
import randomHex from 'random-hex';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Moment from 'react-moment';
import { useState, useEffect } from 'react';

const Account = ({ user }: { user: User }) => {
	const [formState, setFormState] = useState<{
		name: string;
		username: string;
		email: string;
	}>();

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
						<p>Name</p>
						<TextField color="primary" value={formState?.name} />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Account;
