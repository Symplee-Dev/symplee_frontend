import { useSelector } from 'react-redux';
import { RootState } from '../redux/types/state-types';
import { Snackbar } from '@material-ui/core';
import { UIActions } from '../redux/actions/index';
import { Alert, Color } from '@material-ui/lab';

const Notifications = () => {
	const notifications = useSelector(
		(state: RootState) => state.ui.notifications
	);

	const clearNotification = UIActions.useClearNotification();

	return (
		<>
			{notifications.map(n => (
				<Snackbar
					open={true}
					autoHideDuration={n.autoTimeoutTime ?? 3000}
					onClose={() => clearNotification(n.id)}
				>
					<Alert
						onClose={() => clearNotification(n.id)}
						severity={n.type as Color}
					>
						{n.title}
					</Alert>
				</Snackbar>
			))}
		</>
	);
};

export default Notifications;
