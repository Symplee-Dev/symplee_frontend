import {
	Avatar,
	Button,
	Input,
	InputAdornment,
	makeStyles,
	Popover
} from '@material-ui/core';
import {
	Maybe,
	useDeleteMessageMutation,
	useEditMessageMutation
} from '../../../../graphql';
import Moment from 'react-moment';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { UserSelectors } from '../../../../redux/selectors';
import { FormEvent, MouseEvent, useState } from 'react';
import UserPopover from '../../../../V1.0.5/components/UserPopOver/UserPopover';

interface MessageProps {
	message: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: { id: number; username: string; avatar?: string };
	}>;
	noHeader?: boolean;
}

const useStyle = makeStyles({
	form: { width: '98%' },
	editInput: {
		width: '100%',
		background: '#dfdfdf',
		padding: '.5em 1em'
	},
	popover: {
		padding: '1em'
	},
	popoverItem: {
		background: '#404040',
		color: '#efefef',
		padding: '.5em 2em',
		cursor: 'pointer'
	}
});

const Message = ({ message, noHeader = false }: MessageProps) => {
	const classes = useStyle();
	const userId = UserSelectors.useSelectUserId();
	const [showBubble, setShowBubble] = useState(false);
	const [popoverRef, setPopoverRef] = useState<SVGSVGElement | null>(null);
	const [editingMessage, setEditingMessage] = useState(false);
	const [editMessageBody, setEditMessageBody] = useState<string>(() =>
		message ? message?.body : ''
	);
	const [anchorEl, setAnchorEl] = useState<
		(EventTarget & HTMLHeadingElement) | null
	>(null);
	const [showTime, setShowTime] = useState(false);

	const id = message ? message.id : -1;
	const [editMessage] = useEditMessageMutation();
	const handleSubmitEdit = (e: FormEvent) => {
		e.preventDefault();
		editMessage({
			variables: { messageInput: { body: editMessageBody, id } }
		});
		setEditingMessage(false);
	};

	const [deleteMessage] = useDeleteMessageMutation({
		variables: { messageId: message ? message.id : -1 }
	});

	const toggleMenu = (e: MouseEvent<SVGSVGElement>) => {
		setPopoverRef(e.currentTarget);
	};

	const closeMenu = () => {
		setPopoverRef(null);
	};

	if (!message) return null;

	return (
		<div
			className="message-container"
			style={{
				paddingTop: noHeader ? '0 !important' : '1rem',
				paddingLeft: '1rem'
			}}
		>
			{!noHeader && (
				<div className="top">
					<div className="left">
						<Avatar src={message.author.avatar}>
							{message.author.username[0].toUpperCase()}
						</Avatar>
						<h4 onClick={el => setAnchorEl(el.currentTarget)}>
							{message.author.username}
						</h4>
						{anchorEl && (
							<UserPopover
								anchor={anchorEl}
								user={message.author}
								setAnchor={setAnchorEl}
							/>
						)}
						<p>
							<Moment fromNow={true} ago>
								{new Date(message.createdAt)}
							</Moment>{' '}
							ago
						</p>
					</div>
				</div>
			)}

			<div
				style={{
					background: showBubble ? 'rgb(128,128,128, 0.05)' : 'none',
					cursor: showBubble ? 'pointer' : 'initial'
				}}
				className="body"
				onMouseEnter={() => {
					setShowTime(true);
					userId === message.author.id && setShowBubble(true);
				}}
				onMouseLeave={() => {
					setShowTime(false);
					userId === message.author.id && setShowBubble(false);
				}}
			>
				{editingMessage ? (
					<form onSubmit={handleSubmitEdit}>
						<Input
							className={classes.editInput}
							value={editMessageBody}
							onChange={e => {
								setEditMessageBody(e.target.value);
							}}
							endAdornment={
								<InputAdornment position="end">
									<Button type="submit">Send</Button>
								</InputAdornment>
							}
						/>
					</form>
				) : (
					<div
						style={{
							display: 'flex',
							width: '100%',
							alignItems: 'center'
						}}
					>
						<p>{message.body}</p>
						{showTime && (
							<p style={{ color: 'gray', fontSize: '0.8rem' }}>
								<Moment fromNow ago>
									{message.createdAt}
								</Moment>{' '}
								ago
							</p>
						)}
					</div>
				)}
				<div className="bubbles" style={{ opacity: showBubble ? '1' : '0' }}>
					{userId === message.author.id && (
						<div className="chat-actions">
							<MoreVertSharpIcon onClick={toggleMenu} />
							<Popover
								className={classes.popover}
								open={!!popoverRef}
								anchorEl={popoverRef}
								onClose={closeMenu}
								anchorOrigin={{
									vertical: 'center',
									horizontal: 'center'
								}}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'left'
								}}
							>
								<p
									className={classes.popoverItem}
									onClick={e => setEditingMessage(true)}
								>
									Edit Message
								</p>
								<p
									className={classes.popoverItem}
									onClick={() => {
										deleteMessage();
									}}
								>
									Delete Message
								</p>
							</Popover>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Message;
