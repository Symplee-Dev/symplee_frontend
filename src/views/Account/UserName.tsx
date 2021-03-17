import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Tooltip } from '@material-ui/core';

import { UserProps } from './Account';

interface UserNameProps {
	user: UserProps;
}
export const UserName = ({ user }: UserNameProps) => {
	return (
		<div className="username-container">
			<div
				style={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<h2 className="username">
					{user.username}
					<span style={{ fontWeight: 'bold' }}> #{user.key}</span>
				</h2>
				<Tooltip
					placement="top"
					title="Verified Member"
					className="verified"
				>
					<VerifiedUserIcon />
				</Tooltip>
			</div>
		</div>
	);
};
