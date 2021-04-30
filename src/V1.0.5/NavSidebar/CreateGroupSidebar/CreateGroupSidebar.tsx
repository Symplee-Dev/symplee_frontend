import { Drawer, LinearProgress } from '@material-ui/core';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Select from 'react-select';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useCreateChatGroupMutation } from '../../../graphql';
import { RootState } from '../../../redux/types/state-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar } from '../../components';
import Button from '../../components/Button/Button';

const visibilityOptions = [
	{ value: 'Public', label: 'Public', className: 'option' },
	{ value: 'Private', label: 'Private', className: 'option' }
];

const CreateGroupSidebar = ({
	open,
	setOpen
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [newGroup, setNewGroup] = useState({
		isPublic: false,
		name: '',
		avatar: undefined
	});

	const history = useHistory();

	const [create, { loading }] = useCreateChatGroupMutation();

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

	const userId = useSelector((state: RootState) => state.user.userId);

	const handleSubmit = e => {
		e.preventDefault();

		if (newGroup.name.length > 0) {
			create({
				variables: { chatGroup: { ...newGroup, userId: userId! } }
			}).then(d => {
				history.push('/chat/' + d.data?.createChatGroup.id);
				setNewGroup({
					isPublic: false,
					name: '',
					avatar: undefined
				});
				setOpen(false);
			});
		}
	};

	return (
		<Drawer variant="persistent" anchor="right" open={open}>
			<div className="drawer">
				<div className="top">
					<FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} />
				</div>
				<div className="content">
					<div className="content-top">
						<h4>Create A Group</h4>
						<p className="desc">
							Here you can create a new group. Groups are where you can create
							text or voice and video channels to communicate with teams or
							communities.
						</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="image">
							<Avatar
								src={newGroup.avatar ?? ''}
								fallback={newGroup.name[0]}
								hasStatus={false}
								className="large"
							/>
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
									Change Avatar
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
						<p>Group Name</p>
						<input
							type="text"
							className="text-field"
							required
							onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
							value={newGroup.name}
						/>
						<p>Visibility</p>
						<Select
							isMulti={false}
							defaultValue={newGroup.isPublic as any}
							onChange={e => {
								console.log(e);

								setNewGroup({
									...newGroup,
									isPublic: e?.value === 'Public' ? true : false
								});
							}}
							options={visibilityOptions}
							className="select-component"
							theme={theme => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary: '#212529',
									primary25: '#ebebeb'
								}
							})}
						/>
						<div>
							<p style={{ fontSize: '0.8rem' }}>
								{!newGroup.isPublic
									? 'This group is currently set to private and will not be able to be found on the community page'
									: 'This group is currently set to public and will be able to be found on the community page'}
							</p>
							{!loading && (
								<Button
									clickHandler={() =>
										handleSubmit({ preventDefault: () => {} })
									}
									content="Create Group"
									size="large"
									color="success"
								/>
							)}
							{loading && <LinearProgress color="primary" />}
						</div>
					</form>
				</div>
			</div>
		</Drawer>
	);
};

export default CreateGroupSidebar;
