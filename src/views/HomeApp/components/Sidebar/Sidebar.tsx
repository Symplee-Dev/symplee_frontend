import './style.scss';
import { useReactPath } from '../../../../hooks/useReactPath';
import ChatGroupButton from './ChatGroupButton';

// Icons
import AddSharpIcon from '@material-ui/icons/AddSharp';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import { RootState } from '../../../../redux/types/state-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

const Sidebar = ({
	setCreatingGroup
}: {
	setCreatingGroup: (input: boolean) => void;
}) => {
	const path = useReactPath();
	const [el, setEl] = useState<HTMLDivElement | null>(null);

	const chatGroups = useSelector(
		(state: RootState) => state.user.user?.chatGroups ?? []
	);

	const history = useHistory();

	const pos = localStorage.getItem('SIDEBAR_SCROLLPOS');
	if (pos !== null) {
		if (el) {
			el.scrollTop = parseInt(pos, 10);
		}
	}

	const handleSet = () => {
		if (el) {
			localStorage.setItem('SIDEBAR_SCROLLPOS', el.scrollTop.toString());
		}
	};

	return (
		<div className="sidebar" ref={el => setEl(el)}>
			<div className="sidebar-btn" onClick={() => history.push('/')}>
				<DashboardSharpIcon />
			</div>
			<div className="sidebar-btn" onClick={() => setCreatingGroup(true)}>
				<AddSharpIcon />
			</div>
			<hr />

			<>
				{chatGroups.map((chatGroup, key) => (
					<ChatGroupButton
						onClick={handleSet}
						path={path}
						key={key}
						group={{
							id: chatGroup.id,
							image: chatGroup.avatar,
							name: chatGroup.name
						}}
					/>
				))}
			</>
		</div>
	);
};

export default Sidebar;
