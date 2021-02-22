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
	console.log('here');

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			className="changelog-modal"
			open={true}
			onClose={() => setOpen(false)}
		>
			<h2>Latest Updates</h2>
			<p>{changeLog.version}</p>
		</Dialog>
	);
};

export default ChangeLogModal;
