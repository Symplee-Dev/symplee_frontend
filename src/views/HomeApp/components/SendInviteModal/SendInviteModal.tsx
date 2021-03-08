import './style.scss';
import Dialog from '@material-ui/core/Dialog';
import {
	CircularProgress,
	DialogContent,
	MenuItem,
	Select
} from '@material-ui/core';
import { useState } from 'react';
import { UserSelectors, UISelectors } from '../../../../redux/selectors';
import { useSendInviteMutation } from '../../../../graphql';
import { UIActions } from '../../../../redux/actions/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';

interface SendInviteModalProps {
	open: boolean;
	setOpen: (val: boolean) => void;
}

const SendInviteModal = ({ open, setOpen }: SendInviteModalProps) => {
	const userId = UserSelectors.useSelectUserId();
	const currentGroup = UISelectors.useSelectCurrentChatGroup();
	const id = useSelector(
		(state: RootState) => state.ui.notifications.length + 1
	);

	const [formState, setFormState] = useState<{
		fromId: number;
		uses: number;
		to: number[];
		groupId: number;
	}>({
		fromId: userId!,
		uses: -1,
		to: [],
		groupId: currentGroup!.id
	});

	const [sendInvite, { data, loading, error }] = useSendInviteMutation();

	const sendNotification = UIActions.useAddNotification();

	const handleSubmit = e => {
		e.preventDefault();
		sendInvite({ variables: { invite: formState } });

		if (data && !error) {
			sendNotification({
				id,
				title: 'Invite Sent!',
				type: 'success',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});
		}
	};

	return (
		<Dialog
			fullWidth
			maxWidth="md"
			open={open}
			onClose={() => setOpen(!open)}
			PaperProps={{ className: 'paper-ref' }}
		>
			<DialogContent>
				<h3>Create a new invite code</h3>
				{loading && <CircularProgress />}

				{!data && !error && (
					<form onSubmit={handleSubmit}>
						<p>Number of uses</p>
						<Select
							fullWidth
							value={formState.uses}
							onChange={e =>
								setFormState({
									...formState,
									uses: e.target.value as number
								})
							}
						>
							<MenuItem value={-1}>Unlimited</MenuItem>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
							<MenuItem value={100}>100</MenuItem>
							<MenuItem value={1000}>1000</MenuItem>
						</Select>
					</form>
				)}
				{data && !error && (
					<div className="copy-code">
						<p>{data.sendInvite}</p>
						<FileCopySharpIcon />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SendInviteModal;
