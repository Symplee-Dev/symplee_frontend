import './styles.scss';
import { Popover } from '@material-ui/core';
import { PopoutProps } from '../NotificationPopout/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserSelectors } from '../../../redux/selectors';
import { useHistory } from 'react-router';
import { UserActions } from '../../../redux/actions/index';
import {
	faCog,
	faCogs,
	faEye,
	faSignOutAlt,
	faUser
} from '@fortawesome/free-solid-svg-icons';

const UserPopout = ({ anchor, setAnchor }: PopoutProps) => {
	const userId = UserSelectors.useSelectUserId();
	const logout = UserActions.useLogout();

	const history = useHistory();

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
			<div className="user-popout">
				<div
					className="link"
					onClick={() => history.push(`/profile/${userId}`)}
				>
					<Link to={`/profile/${userId}`}>You</Link>
					<FontAwesomeIcon icon={faUser} />
				</div>
				<hr />

				<div className="link">
					<Link to="">Account</Link>
					<FontAwesomeIcon icon={faCog} />
				</div>
				<hr />
				<div className="link">
					<Link to="">Settings</Link>
					<FontAwesomeIcon icon={faCogs} />
				</div>
				<hr />

				<div className="link">
					<Link to="">User Agreement</Link>
					<FontAwesomeIcon icon={faEye} />
				</div>
				<hr />

				<div className="link logout">
					<Link to="" onClick={logout}>
						Logout
					</Link>
					<FontAwesomeIcon icon={faSignOutAlt} />
				</div>
			</div>
		</Popover>
	);
};

export default UserPopout;
