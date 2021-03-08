import './style.scss';
import Dialog from '@material-ui/core/Dialog';
import {
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	MenuItem,
	Select,
	Tooltip
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
	const userId = useSelector((state: RootState) => state.user.user!.id);
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
		fromId: userId,
		uses: -1,
		to: [],
		groupId: currentGroup!.id
	});

	const [sendInvite, { data, loading, error }] = useSendInviteMutation();

	const sendNotification = UIActions.useAddNotification();
	const [copied, setCopied] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		sendInvite({
			variables: { invite: { ...formState, fromId: userId } }
		}).then(() => {
			sendNotification({
				id,
				title: 'Invite Sent!',
				type: 'success',
				autoDismiss: true,
				autoTimeoutTime: 3000
			});
		});
	};

	const onCopy = () => {
		navigator.clipboard.writeText(data!.sendInvite.toString() ?? '');

		setCopied(true);
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
				<h3>Create a new invite code {copied && '- Copied!'}</h3>
				{loading && <CircularProgress />}

				{!data && !error && (
					<form onSubmit={handleSubmit}>
						<h5>Number of uses</h5>
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
						<button className="generate-btn">Generate</button>
					</form>
				)}
				{data && !error && (
					<Tooltip placement="bottom" title="Copy">
						<div className="copy-code" onClick={onCopy}>
							<p>{data.sendInvite}</p>
							<FileCopySharpIcon />
						</div>
					</Tooltip>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SendInviteModal;