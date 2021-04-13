import { Popover } from '@material-ui/core';
import { PopoutProps } from '../../NavSidebar/NotificationPopout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const ChatGroupInfoSwitch = ({ anchor, setAnchor }: PopoutProps) => {
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
			<div className="header">
				<p>Switch Channels</p>
				<FontAwesomeIcon icon={faRandom} />
			</div>
		</Popover>
	);
};

export default ChatGroupInfoSwitch;
