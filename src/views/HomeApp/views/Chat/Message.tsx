import { Avatar, makeStyles, Popover } from '@material-ui/core';
import { Maybe, useDeleteMessageMutation } from '../../../../graphql';
import Moment from 'react-moment';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import { UserSelectors } from '../../../../redux/selectors';
import { MouseEvent, useState } from 'react';
import UserPopover from '../../components/UserPopOver/UserPopover';

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

	const [anchorEl, setAnchorEl] = useState<
		(EventTarget & HTMLHeadingElement) | null
	>(null);

	const [deleteMessage, { data, loading }] = useDeleteMessageMutation({
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
				onMouseEnter={() =>
					userId === message.author.id && setShowBubble(true)
				}
				onMouseLeave={() =>
					userId === message.author.id && setShowBubble(false)
				}
			>
				<p>{message.body}</p>
				<div
					className="bubbles"
					style={{ opacity: showBubble ? '1' : '0' }}
				>
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
								<p className={classes.popoverItem}>
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
