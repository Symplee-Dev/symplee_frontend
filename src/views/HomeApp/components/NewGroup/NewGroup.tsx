import {
	Avatar,
	Checkbox,
	Chip,
	IconButton,
	TextField,
	Tooltip
} from '@material-ui/core';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import LinkIcon from '@material-ui/icons/Link';
import { useState, useEffect } from 'react';
import { useImageUpload } from '../../../../hooks/useImageUpload';
import { CircularProgress } from '@material-ui/core';
import { useCreateChatGroupMutation } from '../../../../graphql';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import { UserActions } from '../../../../redux/actions/index';

const NewGroup = ({
	group,
	setGroup
}: {
	group: { isPublic: boolean; name: string; avatar: undefined | string };
	setGroup: (input) => void;
}) => {
	const [avatarMode, setAvatarMode] = useState<'URL' | 'UPLOAD' | 'NONE'>(
		'NONE'
	);

	const userId = useSelector((state: RootState) => state.user.userId);

	const [fileRef, setFileRef] = useState<HTMLInputElement | null>(null);

	const [handleUpload, imageLoading] = useImageUpload();

	const refetchUser = UserActions.useRefetchUser();

	const onChange = e => {
		setGroup({ ...group, [e.target.name]: e.target.value });
	};

	const submitUpload = e => {
		handleUpload(e).then(url => setGroup({ ...group, avatar: url }));
	};

	const history = useHistory();

	const [create, { data, loading, error }] = useCreateChatGroupMutation();

	const handleSubmit = e => {
		e.preventDefault();

		if (userId) {
			create({
				variables: { chatGroup: { ...group, userId } }
			}).then(g => {
				refetchUser();

				return g;
			});
			if (data) {
				history.push('/group/' + data.createChatGroup.id);
			}
		}
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<div className="new-group">
			<form className="form" onSubmit={handleSubmit}>
				<Chip
					className="public-label"
					size="small"
					style={{
						backgroundColor: group.isPublic ? '#79a8cd' : '#2B2E30'
					}}
					label={
						group.isPublic ? (
							<p>Public Group</p>
						) : (
							<p>Private Group</p>
						)
					}
				/>
				{group.name.length < 1 && (
					<Avatar
						className="avatar"
						variant="rounded"
						src={group.avatar}
					></Avatar>
				)}
				{group.name.length >= 1 && (
					<Avatar
						src={group.avatar}
						className="avatar"
						variant="rounded"
					>
						{group.name[0].toUpperCase()}
					</Avatar>
				)}

				{avatarMode === 'URL' && (
					<div className="paste-link">
						<TextField
							className="text-field"
							autoFocus
							name="avatar"
							onChange={onChange}
							onBlur={() => setAvatarMode('NONE')}
							label="Link"
							value={group.avatar}
							type="text"
							placeholder="https://google.com"
							variant="filled"
							inputProps={{ style: { color: 'white' } }}
						></TextField>
					</div>
				)}

				<div className="upload-actions">
					{avatarMode === 'NONE' && !imageLoading && (
						<>
							<Tooltip placement="bottom" title="Upload Image">
								<IconButton
									color="primary"
									onClick={() => fileRef && fileRef.click()}
								>
									<PhotoLibraryIcon />
									<input
										onChange={submitUpload}
										type="file"
										accept="image/*"
										style={{
											display: 'none'
										}}
										ref={el => setFileRef(el)}
									/>
								</IconButton>
							</Tooltip>
							<Tooltip placement="bottom" title="Paste a link">
								<IconButton
									color="primary"
									onClick={() => setAvatarMode('URL')}
								>
									<LinkIcon />
								</IconButton>
							</Tooltip>
						</>
					)}
				</div>
				{imageLoading && <CircularProgress />}
				<TextField
					required
					className="text-field"
					autoFocus
					name="name"
					onChange={onChange}
					label="Name"
					value={group.name}
					type="text"
					fullWidth
					placeholder="The Boys"
					variant="filled"
					inputProps={{ style: { color: 'white' } }}
				></TextField>
				<div className="public-div">
					<p>Open Group To The Public</p>
					<Checkbox
						checked={group.isPublic}
						color="primary"
						value={group.isPublic}
						onChange={() =>
							setGroup({ ...group, isPublic: !group.isPublic })
						}
					/>
				</div>
				<button className="submit-btn">Get Chatting</button>
			</form>
		</div>
	);
};

export default NewGroup;
