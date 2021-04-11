import './style.scss';
import { Popover } from '@material-ui/core';

export interface PopoutProps {
	anchor: any;
	setAnchor: React.Dispatch<any>;
}

const NotificationPopout = ({ anchor, setAnchor }: PopoutProps) => {
	return (
		<Popover
			style={{ marginLeft: '2rem' }}
			onClose={() => setAnchor(null)}
			open={anchor !== undefined && anchor !== null}
			anchorEl={anchor}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			Notifications
		</Popover>
	);
};

export default NotificationPopout;
