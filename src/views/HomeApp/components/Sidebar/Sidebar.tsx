import './style.scss';
import { useReactPath } from '../../../../hooks/useReactPath';
import ChatGroupButton from './ChatGroupButton';

// Icons
import AddSharpIcon from '@material-ui/icons/AddSharp';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import { RootState } from '../../../../redux/types/state-types';
import { useSelector } from 'react-redux';

const Sidebar = () => {
	const path = useReactPath();

	const chatGroups = useSelector(
		(state: RootState) => state.user.user?.chatGroups ?? []
	);

	return (
		<div className="sidebar">
			<div className="sidebar-btn">
				<DashboardSharpIcon />
			</div>
			<div className="sidebar-btn">
				<AddSharpIcon />
			</div>
			<hr />

			{chatGroups.map((chatGroup, key) => (
				<ChatGroupButton
					path={path}
					key={key}
					group={{
						id: chatGroup.id,
						image: chatGroup.avatar,
						name: chatGroup.name
					}}
				/>
			))}
		</div>
	);
};

export default Sidebar;
