import { motion } from 'framer-motion';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {
	Avatar,
	Tooltip,
	TextField,
	LinearProgress,
	Snackbar
} from '@material-ui/core';
import randomHex from 'random-hex';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Moment from 'react-moment';
import { useState, useEffect } from 'react';
import UndoIcon from '@material-ui/icons/Undo';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import { useUpdateUserMutation } from '../../../graphql';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Account = ({
	user
}: {
	user: {
		name: string;
		username: string;
		email: string;
		key: string;
		createdAt: string;
		avatar?: string;
	};
}) => {
	const [formState, setFormState] = useState<{
		name: string;
		username: string;
		email: string;
		avatar: string | undefined;
	}>({ name: '', username: '', email: '', avatar: undefined });

	const [imageLoading, setImageLoading] = useState(false);

	const [updateUser] = useUpdateUserMutation();

	const [notifState, setNotifState] = useState<{
		title: string;
		value: boolean;
	}>({ title: '', value: false });

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	useEffect(() => {
		setFormState({
			name: user.name,
			username: user.username,
			email: user.email,
			avatar: user.avatar
		});
	}, [user]);

	const handleSubmit = () => {
		updateUser({ variables: { user: formState, userId } }).then(() => {
			setNotifState({ title: 'User Updated Successfully', value: true });
			//@ts-ignore
		});
	};

	const handleImageUpload = async e => {
		const files = e.target.files;
		const data = new FormData();

		data.append('file', files[0]);
		data.append(
			'upload_preset',
			process.env.REACT_APP_CLOUDINARY_UPLOAD_TARGET ?? ''
		);
		data.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY ?? '');
		data.append('timestamp', Date.now().toString());
		setImageLoading(true);
		const res = await axios.post(
			'https://api.cloudinary.com/v1_1/boltchat/image/upload',
			data
		);

		setFormState({ ...formState, avatar: res.data.url });
		setImageLoading(false);
	};

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
					<div>
						<div className="top-top">
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
							<h6>
								Joined{' '}
								<Moment fromNow={true} ago>
									{new Date(user.createdAt)}
								</Moment>{' '}
								ago
							</h6>
						</div>
						<div className="change-avatar-root">
							{!imageLoading ? (
								<label className="file-upload-root">
									<input
										onChange={handleImageUpload}
										type="file"
										accept="image/*"
										style={{ border: 'none' }}
									/>
									Change Avatar{' '}
									<CloudUploadIcon
										style={{ marginLeft: '0.5rem' }}
									/>
								</label>
							) : (
								<>
									<LinearProgress
										color="primary"
										style={{
											marginTop: '1rem',
											marginBottom: '0.5rem'
										}}
									/>
									<p>Uploading Image...</p>
								</>
							)}
						</div>
					</div>
					<div className="avatar-icon">
						{!formState.avatar ? (
							<Avatar
								style={{ background: randomHex.generate() }}
							>
								{user.username[0]}
							</Avatar>
						) : (
							<Avatar src={formState.avatar} />
						)}
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
							type="text"
							variant="filled"
							value={formState?.name}
							inputProps={{ className: 'input-field' }}
						/>
					</div>
					{/* Can uncomment when mutation is fixed, handle email in use */}
					{/* <div className="row">
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
							type="email"
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
					</div> */}
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
							type="text"
							value={formState?.username}
							inputProps={{ className: 'input-field' }}
						/>
					</div>
					<div className="row">
						<button onClick={handleSubmit}>Save</button>
					</div>
				</div>
			</div>
			<Snackbar
				open={notifState.value}
				autoHideDuration={3000}
				onClose={() => setNotifState({ title: '', value: false })}
			>
				<Alert
					onClose={() => setNotifState({ title: '', value: false })}
				>
					{notifState.title}
				</Alert>
			</Snackbar>
		</motion.div>
	);
};

export default Account;
