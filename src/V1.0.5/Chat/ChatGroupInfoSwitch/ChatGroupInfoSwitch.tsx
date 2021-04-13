import { Popover } from '@material-ui/core';
import { PopoutProps } from '../../NavSidebar/NotificationPopout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types/state-types';
import Button from '../../components/Button/Button';
import { Avatar } from '../../components';

const ChatGroupInfoSwitch = ({ anchor, setAnchor }: PopoutProps) => {
	const groups = useSelector((state: RootState) => state.user.user?.chatGroups);

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
			<div className="popout">
				<div className="header">
					<p>Switch Channels</p>
					<FontAwesomeIcon icon={faRandom} />
				</div>
				<div className="groups">
					{groups?.map((group, key) => (
						<>
							<div className="group" key={key}>
								<div>
									<Avatar
										className="small"
										src={group.avatar ?? ''}
										hasStatus={false}
										fallback={group.name[0]}
									/>
									<h4>{group.name}</h4>
								</div>
								<Button
									clickHandler={() => alert('Not implemented')}
									content="Jump"
									color="main"
									size="small"
								/>
							</div>
							<hr />
						</>
					))}
				</div>
			</div>
		</Popover>
	);
};

export default ChatGroupInfoSwitch;
