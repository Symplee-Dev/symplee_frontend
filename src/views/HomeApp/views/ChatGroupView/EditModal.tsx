import {
	Avatar,
	Button,
	DialogActions,
	TextField,
	Tooltip
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import {
	Maybe,
	useUpdateChatGroupMutation,
	Exact,
	ChatGroupQuery
} from '../../../../graphql';
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { ToggleButton } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import { ApolloQueryResult } from '@apollo/client';

const EditModal = ({
	group,
	open,
	setOpen,
	refetch
}: {
	group: {
		id: number;
		name: string;
		isPublic: boolean;
		createdAt: string;
		avatar?: Maybe<string>;
		createdBy: number;
	};
	open: boolean;
	setOpen: (val: boolean) => void;
	refetch: (
		variables?:
			| Partial<
					Exact<{
						id: number;
					}>
			  >
			| undefined
	) => Promise<ApolloQueryResult<ChatGroupQuery>>;
}) => {
	const [changes, setChanges] = useState({
		name: group.name,
		isPublic: group.isPublic,
		avatar: group.avatar
	});

	const [imageLoading, setImageLoading] = useState(false);

	const [updateGroup, { loading }] = useUpdateChatGroupMutation();

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

		setChanges({ ...changes, avatar: res.data.url });
		setImageLoading(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		await updateGroup({
			variables: { chatGroupId: group.id, group: changes }
		});
		refetch({
			//@ts-ignore
			fetchPolicy: 'network-only',
			//@ts-ignore
			variables: { id: parseInt(group.id) }
		});
	};

	return (
		<>
			<Dialog
				fullScreen
				scroll="paper"
				className="edit-group-modal"
				open={open}
				onClose={() => setOpen(false)}
				PaperProps={{ className: 'editgroup-paper' }}
			>
				<div className="header">
					<div className="cancel" onClick={() => setOpen(false)}>
						<Tooltip
							placement="right"
							title="Exiting without saving will not save changes"
						>
							<CancelIcon color="primary" className="icon" />
						</Tooltip>
					</div>
					<div className="right">
						{changes.avatar && <Avatar src={changes.avatar} />}
						<h3>{group.name}</h3>
					</div>
				</div>
				<form className="body" onSubmit={handleSubmit}>
					{changes.avatar && (
						<Avatar src={changes.avatar} className="avatar" />
					)}
					{!imageLoading ? (
						<label className="file-upload-root">
							<input
								onChange={handleImageUpload}
								type="file"
								accept="image/*"
								style={{ border: 'none' }}
							/>
							Change Avatar{' '}
							<CloudUploadIcon style={{ marginLeft: '0.5rem' }} />
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
					<p className="label">Group Name</p>
					<TextField
						type="text"
						fullWidth
						required
						placeholder="Group Name"
						value={changes.name}
						variant="filled"
						inputProps={{ className: 'input-field' }}
						onChange={e =>
							setChanges({ ...changes, name: e.target.value })
						}
					/>

					<p className="label">
						Access ({changes.isPublic ? 'Public' : 'Private'})
					</p>
					<ToggleButton
						value={changes.isPublic}
						selected={changes.isPublic}
						onChange={() =>
							setChanges({
								...changes,
								isPublic: !changes.isPublic
							})
						}
					>
						<CheckIcon />
					</ToggleButton>
				</form>
				<DialogActions>
					{!loading ? (
						<>
							<Button
								color="primary"
								onClick={() => setOpen(false)}
							>
								Discard
							</Button>
							<Button color="primary" onClick={handleSubmit}>
								Save
							</Button>
						</>
					) : (
						<LinearProgress style={{ width: '100%' }} />
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditModal;
