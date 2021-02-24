import { motion } from 'framer-motion';
import { Tooltip } from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const Header = ({
	name,
	isAuthor,
	openEdit
}: {
	name: string;
	isAuthor: boolean;
	openEdit: (val: boolean) => void;
}) => {
	return (
		<motion.div className="banner" exit={{ opacity: 0 }}>
			<div>
				<h2>Welcome to the {name} group</h2>
			</div>
			<div className="settings" onClick={() => openEdit(true)}>
				{isAuthor && (
					<Tooltip placement="top" title="Update Group Settings">
						<SettingsApplicationsIcon
							color="primary"
							className="icon"
						/>
					</Tooltip>
				)}
			</div>
		</motion.div>
	);
};

export default Header;
