import './styles.scss';

// Icons
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import { UserActions } from '../../../../redux/actions/index';
import { Tooltip } from '@material-ui/core';

type ClickType = 'LOGOUT' | 'SETTINGS' | 'PUBLIC' | 'ACCOUNT';

const SidebarFooter = () => {
	const logout = UserActions.useLogout();

	const handleGroup = (type: ClickType) => {
		switch (type) {
			case 'LOGOUT': {
				logout();
				break;
			}
			case 'SETTINGS': {
				break;
			}
			case 'PUBLIC': {
				break;
			}
			case 'ACCOUNT': {
				break;
			}
			default: {
				break;
			}
		}
	};

	return (
		<div className="sidebar-footer">
			<Tooltip placement="top" title="Logout">
				<div
					className="footer-icon"
					onClick={() => handleGroup('LOGOUT')}
				>
					<ExitToAppSharpIcon />
				</div>
			</Tooltip>
			<div className="footer-icon">
				<SettingsSharpIcon />
			</div>
			<div className="footer-icon">
				<PublicSharpIcon />
			</div>
			<div className="footer-icon">
				<AccountBoxSharpIcon />
			</div>
		</div>
	);
};

export default SidebarFooter;
