import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

const ChangeLogModal = ({
	open,
	setOpen,
	changeLog
}: {
	open: boolean;
	setOpen: (val: boolean) => void;
	changeLog: { id: number; body: string; changes: string[]; version: string };
}) => {
	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			className="changelog-modal"
			open={open}
			onClose={() => setOpen(false)}
			PaperProps={{ className: 'changelog-paper' }}
		>
			<DialogTitle className="title-div">
				<p className="title">Latest Updates</p>
				<p className="sub-title">
					Another Update! Here are the latest changes here on Bolt.
				</p>
			</DialogTitle>
			<DialogContent className="content-div">
				<h3>{changeLog.version} 🎉</h3>
				<ul>
					{changeLog.changes.map((log, key) => (
						<li key={key}>{log}</li>
					))}
				</ul>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={() => setOpen(false)}>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ChangeLogModal;
