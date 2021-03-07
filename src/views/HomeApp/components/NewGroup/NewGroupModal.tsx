import './styles.scss';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Tooltip } from '@material-ui/core';

// Icons
import AddSharpIcon from '@material-ui/icons/AddSharp';
import KeyboardSharpIcon from '@material-ui/icons/KeyboardSharp';
import { useState } from 'react';

// Icons
import KeyboardBackspaceSharpIcon from '@material-ui/icons/KeyboardBackspaceSharp';
import NewGroup from './NewGroup';

interface NewGroupModalProps {
	open: boolean;
	setOpen: (input: boolean) => void;
}

const NewGroupModal = ({ open, setOpen }: NewGroupModalProps) => {
	const [newGroup, setNewGroup] = useState<{
		isPublic: boolean;
		name: string;
		avatar: undefined | string;
	}>({
		isPublic: false,
		name: '',
		avatar: undefined
	});

	const [route, setRoute] = useState('');

	const cleanupClose = () => {
		setRoute('');
		setNewGroup({ isPublic: false, name: '', avatar: undefined });
		setOpen(false);
	};

	return (
		<Dialog
			fullWidth
			maxWidth="md"
			open={open}
			onClose={cleanupClose}
			PaperProps={{ className: 'paper-ref' }}
		>
			<DialogContent className="content">
				{route !== '' && (
					<div className="go-back" onClick={() => setRoute('')}>
						<Tooltip placement="right" title="Go Back">
							<KeyboardBackspaceSharpIcon />
						</Tooltip>
					</div>
				)}
				{route === '' && <h3>What would you like to do?</h3>}
				{route === 'new-group' && <h3>Create a new group</h3>}
				{route === 'enter-code' && <h3>Enter a group code</h3>}
				{route === '' && (
					<div className="group-router">
						<div
							className="route"
							onClick={() => setRoute('new-group')}
						>
							<p>Create a new Group</p>
							<AddSharpIcon />
						</div>
						<div
							className="route"
							onClick={() => setRoute('enter-code')}
						>
							<p>Enter a code</p>
							<KeyboardSharpIcon />
						</div>
					</div>
				)}
				{route === 'new-group' && (
					<NewGroup group={newGroup} setGroup={setNewGroup} />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default NewGroupModal;
