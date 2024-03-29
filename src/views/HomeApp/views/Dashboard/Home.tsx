import { useGetNotificationsQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';

import RefreshSharpIcon from '@material-ui/icons/RefreshSharp';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import Notification from './Notification';
import HomePreviewCard from '../../components/HomePreviewCard/HomePreviewCard';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';

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
							<Notification
								notif={notif}
								refetch={refetch}
								key={key}
							/>
						))}
					</div>
				)}
			</div>
			<div className="preview-cards">
				<HomePreviewCard
					title="Discover"
					Icon={PublicSharpIcon}
					routeTo="/discover"
					description="Find public groups in the community."
				/>
			</div>
		</div>
	);
};

export default Home;
