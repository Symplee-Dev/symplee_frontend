import { useGetNotificationsQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';

import RefreshSharpIcon from '@material-ui/icons/RefreshSharp';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import Notification from './Notification';

const Home = () => {
	const userId = UserSelectors.useSelectUserId();

	const [type, setType] = useState('ALL');

	const { data, loading, error, refetch } = useGetNotificationsQuery({
		skip: !userId,
		variables: { type: type, userId: userId! }
	});

	const handleRefetch = (val: string) => {
		setType(val);
		refetch({ type, userId: userId! });
	};

	return (
		<div className="home">
			<div className="notifications">
				<div className="top">
					<h3>Notifications</h3>
					<Tooltip placement="right" title="Refresh">
						<RefreshSharpIcon
							className="refresh"
							onClick={() => refetch()}
						/>
					</Tooltip>
				</div>
				{loading && (
					<div className="content">
						<CircularProgress />
					</div>
				)}
				{data && !error && (
					<div className="content">
						{data.getNotifications.map((notif, key) => (
							<Notification notif={notif} refetch={refetch} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
