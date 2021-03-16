import { motion } from 'framer-motion';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {
	Avatar,
	Tooltip,
	TextField,
	LinearProgress,
	Snackbar
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import UndoIcon from '@material-ui/icons/Undo';
import axios from 'axios';
import { useUpdateUserMutation } from '../../graphql';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { ProfileInfo } from './ProfileInfo';
import { UserName } from './UserName';
import { AvatarContainer } from './AvatarContainer';

interface AccountProps {
	user: UserProps;
}
export interface UserProps {
	name: string;
	username: string;
	email: string;
	key: string;
	createdAt: string;
	avatar?: string;
}

export interface FormProps {
	name: string;
	username: string;
	email: string;
	avatar: string | undefined;
}

const Account = ({ user }: AccountProps) => {
	const [formState, setFormState] = useState<FormProps>({
		name: '',
		username: '',
		email: '',
		avatar: undefined
	});

	const [imageLoading, setImageLoading] = useState<boolean>(false);

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

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = e.target.files;
		if (files) {
			const data = new FormData();

			data.append('file', files[0]);
			data.append(
				'upload_preset',
				process.env.REACT_APP_CLOUDINARY_UPLOAD_TARGET ?? ''
			);
			data.append(
				'api_key',
				process.env.REACT_APP_CLOUDINARY_API_KEY ?? ''
			);
			data.append('timestamp', Date.now().toString());
			setImageLoading(true);
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/boltchat/image/upload',
				data
			);

			setFormState({ ...formState, avatar: res.data.url });
			setImageLoading(false);
		}
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
					<div className="form-container">
						<div className="top-top">
							<UserName user={user} />
							<ProfileInfo user={user} />
							<AvatarContainer
								user={user}
								formState={formState}
								imageLoading={imageLoading}
								handleImageUpload={handleImageUpload}
							/>
						</div>
						<div className="top-bottom">
							<h2>Profile Details</h2>

							<div className="row">
								<div>
									<p
										style={{
											color: '#BB86FC',
											fontWeight: 'bold'
										}}
									>
										Name{' '}
									</p>
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
									<p
										style={{
											color: '#BB86FC',
											fontWeight: 'bold'
										}}
									>
										Username
									</p>
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
						</div>
						<div className="row">
							<button onClick={handleSubmit}>Save</button>
						</div>
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
