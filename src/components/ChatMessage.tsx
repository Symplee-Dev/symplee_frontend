import React from 'react';

export interface ChatMessageProps {
	username: string;
	avatar: string;
	date: Date;
	body: string;
}

const ChatMessage: React.SFC<ChatMessageProps> = () => {
	return (
		<div className="container">
			<div className="avatar-container">
				<img src="" alt="" />
			</div>
			<div className="author-container">
				<h5 className="author-header"></h5>
			</div>
			<div className="time-date">
				<h6>TIME DATE</h6>
			</div>
			<div>
				<p className="message-body"></p>
			</div>
		</div>
	);
};

export default ChatMessage;
