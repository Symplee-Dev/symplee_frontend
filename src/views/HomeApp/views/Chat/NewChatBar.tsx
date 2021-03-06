import SendSharpIcon from '@material-ui/icons/SendSharp';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

const NewChatBar = ({
	formState,
	setFormState,
	handleSubmit
}: {
	formState: string;
	setFormState: (input: string) => void;
	handleSubmit: (event) => void;
}) => {
	const [multiLine, setMultiLine] = useState(false);

	const handleKey = event => {
		if (event.keyCode === 13 && event.shiftKey) {
			setMultiLine(!multiLine);
		}
	};

	return (
		<div className="new-chat-bar">
			<form className="chat-bar" onSubmit={handleSubmit}>
				<TextField
					value={formState}
					onChange={e => setFormState(e.target.value)}
					multiline={multiLine}
					fullWidth
					onKeyDown={handleKey}
					className="text-area-root"
					inputProps={{
						className: 'text-area'
					}}
					autoFocus
					InputProps={{ disableUnderline: true }}
					placeholder="Type a message"
				/>
				<SendSharpIcon onClick={handleSubmit} />
			</form>
			<p className="helper">Shift + Enter to expand</p>
		</div>
	);
};

export default NewChatBar;
