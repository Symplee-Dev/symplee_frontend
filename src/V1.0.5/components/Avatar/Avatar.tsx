import { Avatar as UserAvatar, Badge } from '@material-ui/core';
import './Avatar.scss';

export const Avatar = ({
	src,
	fallback,
	hasStatus,
	className = 'small'
}: {
	src: string;
	fallback: string;
	hasStatus: boolean;
	className?: 'small' | 'medium' | 'large';
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
				<UserAvatar src={src} className={className}>
					<p>{fallback}</p>
				</UserAvatar>
			</Badge>
		);
	}

	return (
		<UserAvatar src={src} className={className}>
			<p>{fallback}</p>
		</UserAvatar>
	);
};
