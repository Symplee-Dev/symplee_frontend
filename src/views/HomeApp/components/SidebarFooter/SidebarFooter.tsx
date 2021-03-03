import './styles.scss';

// Icons
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';

const SidebarFooter = () => {
	return (
		<div className="sidebar-footer">
			<div className="footer-icon">
				<ExitToAppSharpIcon />
			</div>
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
