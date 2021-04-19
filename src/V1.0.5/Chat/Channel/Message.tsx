import {
	Maybe,
	useEditMessageMutation,
	useDeleteMessageMutation
} from '../../../graphql';
import { Avatar, Button, TextInput } from '../../components';
import Moment from 'react-moment';
import { UserSelectors } from '../../../redux/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MessageActions from './MessageActions';
import { UserPopover } from '../../components/UserPopOver/UserPopover';

const Message = ({
	message,
	showHeader = true
}: {
	message: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: {
			id: number;
			username: string;
			avatar?: string | undefined;
		};
	}>;
	showHeader?: boolean;
}) => {
	const userId = UserSelectors.useSelectUserId()!;
	const [showActions, setShowActions] = useState(false);

	const [popoverRef, setPopoverRef] = useState<SVGSVGElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<
		(EventTarget & HTMLHeadingElement) | null
	>(null);

	const [deleteMessage] = useDeleteMessageMutation();
	const [editMessage] = useEditMessageMutation();

	const [editingMessage, setEditingMessage] = useState(false);
	const [editMessageBody, setEditMessageBody] = useState<string>(() =>
		message ? message?.body : ''
	);

	if (!message) return null;

	return (
		<div
			className={`message ${userId === message.author.id && 'author-message'}`}
			style={showHeader ? {} : { marginTop: 0 }}
			onMouseEnter={() => setShowActions(true)}
			onMouseLeave={() => setShowActions(false)}
		>
			<div className="content-group">
				{showHeader && (
					<div className="left">
						<Avatar
							fallback={message.author.username[0]}
							src={message.author.avatar ?? ''}
							hasStatus={false}
							className="medium"
						/>
					</div>
				)}
				<div
					className={`middle ${editingMessage && 'editing-middle'}`}
					style={{ marginLeft: editingMessage && !showHeader ? '3rem' : 0 }}
				>
					{showHeader && (
						<div className="top">
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
								<Moment fromNow>{message.createdAt}</Moment>
							</p>
						</div>
					)}
					{!editingMessage && (
						<div
							className="content"
							style={{ marginLeft: showHeader ? 0 : '3.5rem' }}
						>
							<p>{message.body}</p>
						</div>
					)}

					{editingMessage && (
						<div className="content">
							<form
								onSubmit={e => {
									e.preventDefault();
									setEditingMessage(false);
									editMessage({
										variables: {
											messageInput: { body: editMessageBody, id: message.id }
										}
									});
								}}
							>
								<TextInput
									placeHolder="Edit it!"
									value={editMessageBody}
									setValue={e => setEditMessageBody(e.target.value)}
									type="chat"
								/>
							</form>
							<Button
								style={{ marginTop: '1rem' }}
								clickHandler={() => {
									setEditingMessage(false);
								}}
								content="Cancel"
								color="danger"
							/>
						</div>
					)}
				</div>
			</div>
			{userId === message.author.id && showActions && (
				<div className="right">
					<FontAwesomeIcon
						icon={faEllipsisV}
						className="actions-icon"
						onClick={e => setPopoverRef(e.currentTarget)}
					/>
					<MessageActions
						closeMenu={() => setPopoverRef(null)}
						deleteMessage={() =>
							deleteMessage({
								variables: { messageId: message.id }
							})
						}
						popoverRef={popoverRef}
						setEditingMessage={b => setEditingMessage(b)}
					/>
				</div>
			)}
		</div>
	);
};

export default Message;
