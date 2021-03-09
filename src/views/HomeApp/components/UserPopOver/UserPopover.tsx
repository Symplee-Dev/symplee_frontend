import { Avatar, Tooltip } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import './style.scss';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';

export const UserPopover = ({
	anchor,
	setAnchor,
	user
}: {
	anchor;
	setAnchor;
	user: {
		id: number;
		username: string;
		avatar?: string | undefined;
	};
}) => {
	const handleClose = () => {
		setAnchor(null);
	};

	const open = Boolean(anchor);

	return (
		<Popover
			open={open}
			anchorEl={anchor}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			<div className="user-popup">
				<div className="top">
					<div className="left">
						<Avatar src={user.avatar}>
							{user.username[0].toUpperCase()}
						</Avatar>

						<h3>{user.username}</h3>
					</div>
					<div className="right">
						<Tooltip placement="right" title="Send friend request">
							<PersonAddSharpIcon
								style={{ width: '30px', height: '30px' }}
							/>
						</Tooltip>
					</div>
				</div>
				<div className="content">
					<button>View</button>
				</div>
			</div>
		</Popover>
	);
};

export default UserPopover;
