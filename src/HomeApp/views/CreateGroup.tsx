import { Add } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { motion } from 'framer-motion';
import CheckIcon from '@material-ui/icons/Check';

import './createGroup.scss';
import { useState } from 'react';

const CreateGroup = () => {
	const [newGroup, setNewGroup] = useState({
		isPublic: false,
		name: ''
	});

	return (
		<motion.div exit={{ opacity: 0 }} className="create-group">
			<div className="banner">
				<div>
					<h2>Groups</h2> <Add className="icon" />
				</div>
				<p>Create a new group.</p>
			</div>
			<form>
				<div className="body"></div>
				<div className="settings">
					<div className="top">
						<h2>Public</h2>
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
					<button>Create Group</button>
				</div>
			</form>
		</motion.div>
	);
};

export default CreateGroup;
