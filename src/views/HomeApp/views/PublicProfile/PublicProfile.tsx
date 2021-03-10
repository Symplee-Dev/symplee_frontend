import { useParams } from 'react-router';
import { useGetProfileQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';
import PublicProfileSkeleton from './PublicProfileSkeleton';
import { UIActions } from '../../../../redux/actions/index';

const PublicProfile = () => {
	const { id }: { id: string } = useParams();
	const userId = UserSelectors.useSelectUserId()!;
	const setCurrentProfile = UIActions.useSetCurrentProfile();

	const { data, loading, error } = useGetProfileQuery({
		variables: { userId: userId, otherUserId: Number(id) },
		onCompleted(d) {
			setCurrentProfile(d.getProfile);
		}
	});

	return (
		<div className="public-profile">
			<PublicProfileSkeleton />
		</div>
	);
};

export default PublicProfile;
