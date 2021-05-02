import { Avatar, Searchbar } from '../components';
import './style.scss';
import { useState } from 'react';
import { useSearchGroupsLazyQuery, useJoinGroupMutation } from '../../graphql';
import { CircularProgress } from '@material-ui/core';
import { Button } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types/state-types';
import { UserActions, UIActions } from '../../redux/actions/index';
import { UserSelectors } from '../../redux/selectors';

const Discover = () => {
	const [searchString, setSearch] = useState({ back: '', next: '' });
	const [searchGroup, { data, loading, error }] = useSearchGroupsLazyQuery();
	const userGroups = useSelector(
		(state: RootState) => state.user.user?.chatGroups
	)!;
	const addNotification = UIActions.useAddNotification();
	const userId = UserSelectors.useSelectUserId()!;
	const refetchUser = UserActions.useRefetchUser();
	const notifId = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const [joinGroup] = useJoinGroupMutation();

	const reSearch = e => {
		searchGroup({ variables: { queryString: searchString.next } });
	};

	const checkIfInGroup = (gId: number) => {
		const match = userGroups.find(g => g.id === gId);
		console.log(match);

		return match !== undefined ? true : false;
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

	return (
		<div className="discover">
			<div className="inner">
				<h2>Discover</h2>
				<hr />
				{/* <div className="featured">
					<h4>Featured</h4>

					<div className="features">
						<div className="feature"></div>
						<div className="feature"></div>
						<div className="feature"></div>
						<div className="feature"></div>
					</div>
				</div> */}
				<div className="find">
					<h4>
						Find Groups{' '}
						{data &&
							searchString.next.length > 0 &&
							' - ' + data.searchGroups.length + ' Results'}
					</h4>

					<Searchbar
						setValue={e => {
							setSearch({ ...searchString, next: e.target.value });
							reSearch(e);
						}}
						value={searchString.next}
						placeHolder="Search for groups"
						size="fullwidth"
					/>
					{loading && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: '1rem'
							}}
						>
							<CircularProgress style={{ marginTop: '1rem' }} />
						</div>
					)}
					{searchString.next.length < 1 && !loading && (
						<p className="info-text">Start typing to search for a group</p>
					)}
				</div>
				{searchString.next.length > 0 && (
					<div className="groups">
						{data?.searchGroups.map((group, key) => (
							<div className="group" key={key}>
								<div className="left">
									<Avatar
										src={group?.avatar ?? ''}
										fallback={group?.name[0] ?? ''}
										hasStatus={false}
									/>
									<p className="title">{group?.name}</p>
								</div>
								<div className="right">
									{group && checkIfInGroup(group.id) === false ? (
										<Button
											clickHandler={() => handleJoin(group.id)}
											content="Join"
											size="small"
											color="success"
										/>
									) : (
										<p className="already-joined">Already Joined</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Discover;
