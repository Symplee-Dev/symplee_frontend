import SendSharpIcon from '@material-ui/icons/SendSharp';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

function removeNewLine(input: string): string {
	return input.replace(/(\r\n|\n|\r)/gm, '');
}

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

		if (event.keyCode === 8) {
			if (multiLine && formState.length <= 1) {
				setMultiLine(false);
				setFormState(removeNewLine(formState));
			}
		}
	};

	const handleSend = e => {
		e.preventDefault();
		if (removeNewLine(formState).length < 1) {
			return;
		}
		console.log(formState);
		handleSubmit(e);
	};

	return (
		<div className="new-chat-bar">
			<form className="chat-bar" onSubmit={handleSend}>
				<TextField
					value={formState.trimLeft()}
					onChange={e => setFormState(e.target.value.trimLeft())}
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
			{multiLine && formState.length < 1 && (
				<p className="helper">Shift + Enter to minimize</p>
			)}
			{!multiLine && formState.length < 1 && (
				<p className="helper">Shift + Enter to expand</p>
			)}
			{!multiLine && formState.length >= 1 && (
				<p className="helper">Shift + Enter to expand</p>
			)}
			{multiLine && formState.length >= 1 && (
				<p className="helper">Shift + Enter to Send</p>
			)}
		</div>
	);
};

export default NewChatBar;
