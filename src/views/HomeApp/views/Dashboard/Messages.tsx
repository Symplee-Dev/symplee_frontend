import { Route, Switch } from 'react-router';
import { useGetDMsQuery } from '../../../../graphql';
import { UserSelectors } from '../../../../redux/selectors';

const Messages = () => {
	const userId = UserSelectors.useSelectUserId()!;

	const { data } = useGetDMsQuery({ variables: { userId } });

	console.log('here');

	return (
		<div className="dms">
			<div className="dms-sidebar">
				<input
					type="text"
					placeholder="Search for a chat"
					className="dm-searchbar"
				/>
				<button>Start a Chat</button>
				{data && (
					<>
						<>
							{data.getDMS.map((dm, key) => (
								<div className="dm-button" key={key}>
									<p>{dm?.name}</p>
								</div>
							))}
						</>
						{data.getDMS.length < 1 && <p>No Direct Messages</p>}
					</>
				)}
			</div>
			<Switch>
				<Route path="/dm/:id">1</Route>
			</Switch>
		</div>
	);
};

export default Messages;
