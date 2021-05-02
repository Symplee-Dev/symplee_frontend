import { Drawer, LinearProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Picker from 'emoji-picker-react';
import { RootState } from '../../../../redux/types/state-types';
import { useSelector } from 'react-redux';
import { useCreateChatMutation } from '../../../../graphql';
import { useState } from 'react';
import { UISelectors } from '../../../../redux/selectors';
import Select from 'react-select';
import Button from '../../../components/Button/Button';

const visibilityOptions = [
	{ value: 'Public', label: 'Public', className: 'option' },
	{ value: 'Private', label: 'Private', className: 'option' }
];

const chatTypeOptions = [
	{ value: 'text chat', label: 'Text Channel', className: 'option' },
	{
		value: 'Video and Voice',
		label: 'Voice And Video Channel',
		className: 'option'
	}
];

const CreateChatSidebar = ({
	open,
	setOpen
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const chatGroupId = UISelectors.useSelectCurrentChatGroup()?.id;

	const userId = useSelector((state: RootState) => state.user.userId);

	const [createChat, { loading }] = useCreateChatMutation();

	const [newChat, setNewChat] = useState({
		name: '',
		isPublic: false,
		userId: userId,
		icon: '🌏',
		chatGroupId: chatGroupId,
		mode: 'text chat'
	});

	const handleSubmit = e => {
		e.preventDefault();

		if (newChat.name.length > 0) {
			createChat({
				variables: {
					chat: { ...newChat, userId: userId!, chatGroupId: chatGroupId! }
				}
			});
			//@ts-ignore
			setOpen(false);
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
						<h4>Create A Channel</h4>
						<p className="desc">
							Here you can create a new chat channel. These can be a scheduled
							call or chat, or a regular text channel or voice and video
							channel.
						</p>
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<div className="emoji">
								<div className="emoji-top">
									<p id="sub-header">Chat Icon</p>
									<p
										id="sub-value"
										onClick={() => setNewChat({ ...newChat, icon: '' })}
										className="change-emoji"
									>
										Change
									</p>
								</div>
								<p id="sub-value" className="emoji-value">
									{newChat.icon}
								</p>

								{newChat.icon.length <= 0 && (
									<Picker
										preload
										pickerStyle={{
											width: '100%',
											boxShadow: 'none',
											height: '500px'
										}}
										onEmojiClick={(e, emoji) =>
											setNewChat({ ...newChat, icon: emoji.emoji })
										}
									/>
								)}
							</div>
							<p>Group Name</p>
							<input
								type="text"
								className="text-field"
								required
								onChange={e => {
									setNewChat({
										...newChat,
										name: e.target.value.replace(' ', '-').toLowerCase()
									});
								}}
								value={newChat.name}
							/>
							<p>Visibility</p>
							<Select
								isMulti={false}
								defaultValue={newChat.isPublic as any}
								onChange={e => {
									console.log(e);

									setNewChat({
										...newChat,
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
							<p>Channel Type</p>
							<Select
								isMulti={false}
								defaultValue={newChat.mode as any}
								onChange={e => {
									setNewChat({
										...newChat,
										mode: e.value
									});
								}}
								options={chatTypeOptions}
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
						</div>
						<div className="bottom-div">
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

export default CreateChatSidebar;
