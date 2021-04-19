import { makeStyles, Popover } from '@material-ui/core';

const useStyle = makeStyles({
	form: { width: '98%' },
	editInput: {
		width: '100%',
		background: '#dfdfdf',
		padding: '.5em 1em'
	},
	popover: {
		padding: '1em',
		border: 'none'
	},
	popoverItem: {
		background: '#404040',
		color: '#efefef',
		padding: '.5em 2em',
		cursor: 'pointer',
		fontFamily: 'Work Sans',
		fontWeight: 500
	}
});

const MessageActions = ({
	popoverRef,
	deleteMessage,
	closeMenu,
	setEditingMessage
}: {
	popoverRef: SVGSVGElement | null;
	closeMenu: () => void;
	deleteMessage: () => void;
	setEditingMessage: (x: boolean) => void;
}) => {
	const classes = useStyle();

	return (
		<Popover
			className={classes.popover}
			open={popoverRef !== null}
			anchorEl={popoverRef}
			onClose={closeMenu}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'center'
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
		>
			<p
				onClick={() => {
					closeMenu();
					setEditingMessage(true);
				}}
				className={classes.popoverItem}
			>
				Edit Message
			</p>
			<p
				onClick={() => {
					closeMenu();
					deleteMessage();
				}}
				className={classes.popoverItem}
			>
				Delete Message
			</p>
		</Popover>
	);
};

export default MessageActions;
