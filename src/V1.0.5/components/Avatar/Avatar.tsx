import { Avatar as UserAvatar, Badge } from '@material-ui/core';
import './Avatar.scss';

export const Avatar = ({
	src,
	fallback,
	hasStatus
}: {
	src: string;
	fallback: string;
	hasStatus: boolean;
}) => {
	if (hasStatus) {
		return (
			<Badge
				variant="dot"
				overlap="circle"
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<UserAvatar src={src}>
					<p>{fallback}</p>
				</UserAvatar>
			</Badge>
		);
	}

	return (
		<UserAvatar src={src}>
			<p>{fallback}</p>
		</UserAvatar>
	);
};
