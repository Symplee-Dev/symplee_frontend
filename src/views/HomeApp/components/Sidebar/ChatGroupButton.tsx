import { Tooltip, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';

interface ChatGroupProps {
	path: string;
	group: { image?: string; name: string; id: number };
}

const ChatGroupButton = ({ path, group }: ChatGroupProps) => {
	const history = useHistory();

	const handleRoute = () => {
		history.push('/group/' + group.id);
	};

	return (
		<div
			onClick={handleRoute}
			className={`chat-group-button ${
				path === '/group/' + group.id && 'active'
			}`}
		>
			<Tooltip placement="right" title={group.name}>
				<Avatar variant="rounded" src={group.image} alt={group.name}>
					{group.name[0] && group.name[0].toUpperCase()}
				</Avatar>
			</Tooltip>
		</div>
	);
};

export default ChatGroupButton;
