import MemberCard from './MemberCard';
import { useGetMembersQuery } from '../../../../graphql';
import { CircularProgress } from '@material-ui/core';

const MembersBar = ({ chatGroupId }: { chatGroupId: number }) => {
	const { data, loading, error } = useGetMembersQuery({
		variables: { chatId: chatGroupId }
	});

	return (
		<div className="members-bar">
			<h3>All Members</h3>
			<hr />

			{error && <p>No members</p>}

			{!loading ? (
				data?.getMembers.map((user, key) => (
					<MemberCard user={user} key={key} />
				))
			) : (
				<CircularProgress color="primary" />
			)}
		</div>
	);
};

export default MembersBar;
