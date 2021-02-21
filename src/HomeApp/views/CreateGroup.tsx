import { Add, CloudUpload } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { motion } from 'framer-motion';
import CheckIcon from '@material-ui/icons/Check';

import './createGroup.scss';
import { useState, useEffect } from 'react';
import { Avatar, LinearProgress, TextField } from '@material-ui/core';
import { Exact, useCreateChatGroupMutation, UserQuery } from '../../graphql';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router';
import { ApolloQueryResult } from '@apollo/client';
import axios from 'axios';

const CreateGroup = ({
	refetch
}: {
	refetch:
		| ((
				variables?:
					| Partial<
							Exact<{
								id: number;
							}>
					  >
					| undefined
		  ) => Promise<ApolloQueryResult<UserQuery>>)
		| undefined;
}) => {
	const [newGroup, setNewGroup] = useState({
		isPublic: false,
		name: '',
		avatar: undefined
	});

	const history = useHistory();

	const [create, { data, loading, error }] = useCreateChatGroupMutation();

	const [imageLoading, setImageLoading] = useState(false);

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

		setNewGroup({ ...newGroup, avatar: res.data.url });
		setImageLoading(false);
	};

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	useEffect(() => {
		if (data && !loading && !error) {
			//@ts-ignore
			refetch({ fetchPolicy: 'network-only' });
			history.push('/group/' + data.createChatGroup.id);
		}
	}, [data, error, history, loading, refetch]);

	const handleSubmit = e => {
		e.preventDefault();

		create({ variables: { chatGroup: { ...newGroup, userId } } }).then(
			() => {
				//@ts-ignore
				refetch({ fetchPolicy: 'network-only' });
			}
		);
	};

	return (
		<motion.div exit={{ opacity: 0 }} className="create-group">
			<div className="banner">
				<div>
					<h2>Groups</h2> <Add className="icon" />
				</div>
				<p>Create a new group.</p>
			</div>
			{loading && <LinearProgress color="primary" />}
			{!loading && (
				<form onSubmit={handleSubmit}>
					<div className="body">
						<div className="top-body">
							{newGroup.avatar ? (
								<Avatar
									src={newGroup.avatar}
									className="avatar"
								/>
							) : (
								<Avatar className="avatar">
									{newGroup.name[0]}
								</Avatar>
							)}
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
										<CloudUpload
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
							<h2>
								{newGroup.name.length <= 0
									? 'Untitled Group'
									: newGroup.name}
							</h2>
							<p>
								{newGroup.isPublic ? '(Public)' : '(Private)'}
							</p>
						</div>
						<TextField
							fullWidth
							required
							variant="filled"
							placeholder="Group Name"
							color="primary"
							inputProps={{ className: 'name-field' }}
							value={newGroup.name}
							onChange={e =>
								setNewGroup({
									...newGroup,
									name: e.target.value
								})
							}
						/>
					</div>
					<div className="settings">
						<div className="top">
							<h2>Group Settings</h2>
							<p>
								{!newGroup.isPublic
									? 'This group is currently set to private and will not be able to be found on the community page'
									: 'This group is currently set to public and will be able to be found on the community page'}
							</p>
							<ToggleButton
								value={newGroup.isPublic}
								selected={newGroup.isPublic}
								onChange={() =>
									setNewGroup({
										...newGroup,
										isPublic: !newGroup.isPublic
									})
								}
							>
								<CheckIcon />
							</ToggleButton>
						</div>
						<button className="create-btn">Create Group</button>
					</div>
				</form>
			)}
		</motion.div>
	);
};

export default CreateGroup;
