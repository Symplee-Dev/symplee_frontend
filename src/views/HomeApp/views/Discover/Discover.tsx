import { Avatar, CircularProgress } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
	useSearchGroupsLazyQuery,
	useJoinGroupMutation
} from '../../../../graphql';
import { UIActions, UserActions } from '../../../../redux/actions';
import { UserSelectors } from '../../../../redux/selectors';
import { RootState } from '../../../../redux/types/state-types';
import './style.scss';

const Discover = () => {
	const history = useHistory();
	const [searchGroup, { data, loading, error }] = useSearchGroupsLazyQuery();
	const [searchString, setSearchString] = useState({ back: '', next: '' });
	const userGroups = useSelector(
		(state: RootState) => state.user.user?.chatGroups
	)!;
	const userId = UserSelectors.useSelectUserId()!;
	const refetchUser = UserActions.useRefetchUser();
	const addNotification = UIActions.useAddNotification();
	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const [joinGroup] = useJoinGroupMutation();

	const reSearch = e => {
		e.preventDefault();
		if (
			searchString.back === searchString.next ||
			searchString.next.length < 1
		)
			return;
		searchGroup({ variables: { queryString: searchString.next } });
		setSearchString({
			back: searchString.next,
			next: searchString.next
		});
	};

	const handleJoin = (gId: number) => {
		joinGroup({ variables: { groupId: gId, userId: userId } }).then(() => {
			addNotification({
				id: notifId,
				title: 'Joined Group!',
				type: 'success',
				autoDismiss: true,
				autoTimeoutTime: 2000
			});

			refetchUser();
		});
	};

	const checkIfInGroup = (gId: number) => {
		const match = userGroups.find(g => g.id === gId);
		console.log(match);

		return match !== undefined ? true : false;
	};

	return (
		<div className="discover">
			<h3>
				Discover Groups{' '}
				{data &&
					data.searchGroups.length > 0 &&
					' - ' + data.searchGroups.length + ' Results'}
			</h3>
			<form onSubmit={reSearch}>
				<input
					type="text"
					required
					placeholder="The Boys Group"
					value={searchString.next}
					onChange={e =>
						setSearchString({
							...searchString,
							next: e.target.value
						})
					}
				/>
				<button>Search</button>
			</form>
			{loading && <CircularProgress />}
			{data && data.searchGroups.length < 1 && (
				<p style={{ marginTop: '1rem' }}>No Groups Found.</p>
			)}
			<div className="results">
				{data &&
					data.searchGroups.map(
						g =>
							g && (
								<div className="result">
									<div>
										<Avatar src={g.avatar}>
											{g.name[0].toUpperCase()}
										</Avatar>
										<h3>{g.name}</h3>
									</div>
									{checkIfInGroup(g.id) === false ? (
										<button
											onClick={() => handleJoin(g.id)}
										>
											Join
										</button>
									) : (
										<button
											onClick={() =>
												history.push('/group/' + g.id)
											}
										>
											View
										</button>
									)}
								</div>
							)
					)}
			</div>
		</div>
	);
};

export default Discover;
