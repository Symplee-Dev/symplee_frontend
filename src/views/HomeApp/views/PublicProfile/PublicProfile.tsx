import { useParams, useHistory } from 'react-router';
import { useGetProfileQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
import PublicProfileSkeleton from './PublicProfileSkeleton';
import { UIActions } from '../../../../redux/actions/index';
import { Avatar, Badge, Tooltip } from '@material-ui/core';
import Moment from 'react-moment';

const PublicProfile = () => {
	const { id }: { id: string } = useParams();
	const userId = UserSelectors.useSelectUserId()!;
	const setCurrentProfile = UIActions.useSetCurrentProfile();
	const history = useHistory();

	const { data, loading } = useGetProfileQuery({
		variables: { userId: userId, otherUserId: Number(id) },
		onCompleted(d) {
			setCurrentProfile(d.getProfile);
		}
	});

	return (
		<div className="public-profile">
			{loading && <PublicProfileSkeleton />}
			{!loading && data && (
				<>
					<div className="profile">
						<Tooltip
							placement="top"
							title={
								data.getProfile.user.is_online
									? 'Online'
									: 'Offline'
							}
						>
							<Badge
								overlap="circle"
								variant="dot"
								className={`badge ${
									data.getProfile.user.is_online
										? 'active'
										: 'offline'
								}`}
							>
								<Avatar
									src={data.getProfile.user.avatar}
									className="avatar"
								>
									{data?.getProfile.user.username[0].toUpperCase()}
								</Avatar>
							</Badge>
						</Tooltip>
						<h4>
							{data.getProfile.user.username}#
							{data.getProfile.user.key}
						</h4>
						<h5>
							Joined{' '}
							<Moment fromNow>
								{data.getProfile.user.createdAt}
							</Moment>{' '}
							{data.getProfile.user.verified && '- Verified'}
						</h5>
					</div>

					<div className="related-groups-main">
						<h3 className="title">Mutual Groups</h3>
						<>
							{data.getProfile.relatedGroups.map((g, key) =>
								g?.isPublic ? (
									<div className="group-container" key={key}>
										<div className="group">
											<Avatar src={g?.avatar}>
												{g?.name[0].toUpperCase()}
											</Avatar>
											<h3>{g?.name}</h3>
											<p>
												{g.isPublic
													? 'Public'
													: 'Private'}
											</p>
										</div>
										<button
											onClick={() =>
												history.push('/group/' + g.id)
											}
										>
											View
										</button>
									</div>
								) : null
							)}
						</>
					</div>
				</>
			)}
		</div>
	);
};

export default PublicProfile;
