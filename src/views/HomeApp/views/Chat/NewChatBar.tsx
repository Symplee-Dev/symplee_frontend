import SendSharpIcon from '@material-ui/icons/SendSharp';
import { TextField } from '@material-ui/core';

const NewChatBar = () => {
	return (
		<div className="new-chat-bar">
			<form className="chat-bar">
				<TextField
					inputProps={{ className: 'text-area' }}
					multiline
					fullWidth
					placeholder="Type a message"
				/>
				{/* <textarea placeholder="Type a message" /> */}
				<SendSharpIcon />
			</form>
		</div>
	);
};

export default NewChatBar;
