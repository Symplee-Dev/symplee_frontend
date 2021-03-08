import { CircularProgress, TextField } from '@material-ui/core';
import { useAcceptInviteMutation } from '../../../../graphql';
import { useState } from 'react';
import { UserSelectors } from '../../../../redux/selectors';
import { UserActions } from '../../../../redux/actions/index';

const EnterCode = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
	const [acceptInvite, { data, loading, error }] = useAcceptInviteMutation();

	const updateUser = UserActions.useRefetchUser();

	const [code, setCode] = useState('');

	const userId = UserSelectors.useSelectUserId();

	const handleSubmit = () => {
		if (userId) {
			acceptInvite({
				variables: {
					acceptArgs: { code: code, userId, notificationId: -1 }
				}
			});
			updateUser();
		}
	};

	if (loading) return <CircularProgress />;

	return (
		<div className="enter-code">
			{data?.acceptInvite && <p>You've Been Added To A Group!</p>}
			{error && <p>{error.message}</p>}
			{!data?.acceptInvite && (
				<TextField
					required
					fullWidth
					value={code}
					onChange={e => setCode(e.target.value)}
					InputProps={{ style: { color: 'white' } }}
					className="text-field"
					autoFocus
					type="text"
					placeholder="12239-213-32-1231"
				/>
			)}
			<button onClick={() => (!data ? handleSubmit() : setOpen(false))}>
				{!data ? 'Join' : 'Close'}
			</button>
		</div>
	);
};

export default EnterCode;
