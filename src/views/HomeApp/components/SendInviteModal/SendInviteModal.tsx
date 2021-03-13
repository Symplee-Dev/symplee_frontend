import './style.scss';
import Dialog from '@material-ui/core/Dialog';
import {
	Button,
	Checkbox,
	CircularProgress,
	DialogActions,
	DialogContent,
	MenuItem,
	Select,
	TextField,
	Tooltip
} from '@material-ui/core';
import { useState } from 'react';
import { UISelectors } from '../../../../redux/selectors';
import {
	useSendInviteMutation,
	useGetAcceptedFriendsQuery,
	Maybe
} from '../../../../graphql';
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

	const [searchString, setSearchString] = useState('');
	const [localFriends, setLocalFriends] = useState<
		Maybe<{
			friendsSince: string;
			friend?: Maybe<{
				id: number;
				username: string;
				key: string;
				is_online: boolean;
			}>;
		}>[]
	>([]);

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
	const {
		data: friends,
		loading: friendsLoading,
		error: friendsError
	} = useGetAcceptedFriendsQuery({
		variables: { userId: userId },
		onCompleted(d) {
			setLocalFriends(d.getAcceptedFriends);
		}
	});

	const sendNotification = UIActions.useAddNotification();
	const [copied, setCopied] = useState(false);

	const [selected, setSelected] = useState<number[]>([]);

	const handleSubmit = e => {
		e.preventDefault();
		sendInvite({
			variables: {
				invite: { ...formState, fromId: userId, to: selected }
			}
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

	const handleSelect = friendId => {
		if (selected.find(id => id === friendId)) {
			const newSelected = selected.filter(id => id !== friendId);
			setSelected(newSelected);
		} else {
			setSelected([...selected, friendId]);
		}
	};

	const checkIfSelected = (fid: number) => {
		const found = selected.find(id => id === fid);
		return found !== undefined ? true : false;
	};

	const onCopy = () => {
		navigator.clipboard.writeText(data!.sendInvite.toString() ?? '');

		setCopied(true);
	};

	const handleFilter = e => {
		setSearchString(e.target.value);

		if (e.target.value.length <= 0) {
			if (friends) {
				setLocalFriends(friends.getAcceptedFriends);
			}
		} else {
			if (friends) {
				const newFriends = friends?.getAcceptedFriends.filter(
					friend =>
						friend?.friend?.username
							.toLowerCase()
							.includes(e.target.value.toLowerCase()) ||
						friend?.friend?.key
							.toLowerCase()
							.includes(e.target.value.toLowerCase())
				);
				setLocalFriends(newFriends);
			}
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
						{friends && !friendsLoading && (
							<div className="friends-search">
								<h3>
									Search or select friends to invite (
									{selected.length} selected)
								</h3>
								<TextField
									fullWidth
									variant="filled"
									placeholder="Beep#C3P0"
									value={searchString}
									onChange={e => handleFilter(e)}
								/>
								<div className="friends">
									{localFriends.length > 0 &&
										localFriends.map((f, key) => (
											<div className="friend" key={key}>
												<Checkbox
													color="primary"
													onChange={() =>
														handleSelect(
															f?.friend?.id
														)
													}
													checked={checkIfSelected(
														f?.friend?.id as number
													)}
												/>
												{f?.friend?.username}#
												{f?.friend?.key}
											</div>
										))}
									{localFriends.length === 0 && (
										<p>No friends to invite.</p>
									)}
								</div>
							</div>
						)}
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
