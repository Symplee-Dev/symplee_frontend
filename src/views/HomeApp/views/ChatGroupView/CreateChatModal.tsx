import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	LinearProgress,
	MenuItem,
	Select,
	TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { ToggleButton } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import { useCreateChatMutation } from '../../../../graphql';

const CreateChatModal = ({
	open,
	setOpen,
	chatGroupId
}: {
	chatGroupId: number;
	open: boolean;
	setOpen: (set: boolean) => void;
}) => {
	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

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

		createChat({ variables: { chat: newChat } });
		//@ts-ignore
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			maxWidth="md"
			fullWidth
			PaperProps={{
				style: {
					backgroundColor: '#404040',
					color: 'white'
				}
			}}
		>
			<DialogTitle>Create a new chat </DialogTitle>

			<DialogContent>
				<form className="create-chat-form" onSubmit={handleSubmit}>
					<TextField
						color="primary"
						placeholder="Name"
						value={newChat.name}
						variant="filled"
						inputProps={{ className: 'name-field' }}
						required
						fullWidth
						onChange={e =>
							setNewChat({
								...newChat,
								name: e.target.value
									.replace(' ', '-')
									.toLowerCase()
							})
						}
					/>
					<div
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<p>Icon</p>
						{newChat.icon.length > 0 && (
							<p
								onClick={() =>
									setNewChat({ ...newChat, icon: '' })
								}
								style={{
									marginLeft: '0.5rem',
									fontSize: '0.6rem',
									textDecoration: 'underline'
								}}
							>
								Change
							</p>
						)}
					</div>
					<p style={{ marginTop: '0.5rem' }}>{newChat.icon}</p>

					{newChat.icon.length <= 0 && (
						<Picker
							preload
							pickerStyle={{ width: '100%' }}
							onEmojiClick={(e, emoji) =>
								setNewChat({ ...newChat, icon: emoji.emoji })
							}
						/>
					)}
					<p>Make this a public chat?</p>
					<ToggleButton
						value={newChat.isPublic}
						selected={newChat.isPublic}
						onChange={() =>
							setNewChat({
								...newChat,
								isPublic: !newChat.isPublic
							})
						}
					>
						<CheckIcon />
					</ToggleButton>
					<Select
						value={newChat.mode}
						onChange={e =>
							setNewChat({
								...newChat,
								mode: e.target.value as string
							})
						}
					>
						<MenuItem value="text chat">Text Chat</MenuItem>
						<MenuItem value="Video and Voice">
							Video And Voice
						</MenuItem>
					</Select>
				</form>
			</DialogContent>
			<DialogActions>
				{newChat.name.length > 0 && (
					<p>
						#
						{`${newChat.name} (${
							newChat.isPublic ? 'Public' : 'Private'
						}) ${newChat.icon}`}
					</p>
				)}
				{!loading ? (
					<Button
						type="submit"
						color="primary"
						onClick={handleSubmit}
					>
						Create
					</Button>
				) : (
					<LinearProgress color="primary" />
				)}
			</DialogActions>
		</Dialog>
	);
};

export default CreateChatModal;
