import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPaperclip,
	faCode,
	faSmile
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';

type TextInputProps = {
	value: string | number;
	setValue: (e) => void;
	placeHolder: string;
	type?: 'default' | 'chat';
	iconHandlers?: {
		clickedFile: () => void;
		clickedCode: () => void;
		clickedEmoji: () => void;
	};
};

export const TextInput = ({
	value,
	setValue,
	placeHolder,
	type = 'default'
}: TextInputProps) => {
	if (type === 'chat') {
		return (
			<div className="text-input-chat">
				<input
					type="text"
					value={value}
					onChange={setValue}
					placeholder={placeHolder}
				/>
				<div className="icons">
					<FontAwesomeIcon icon={faPaperclip} className="icon" />
					<FontAwesomeIcon icon={faCode} className="icon" />

					<FontAwesomeIcon icon={faSmile} className="icon" />
				</div>
			</div>
		);
	} else {
		return (
			<input
				type="text"
				className="text-input"
				value={value}
				onChange={setValue}
				placeholder={placeHolder}
			/>
		);
	}
};

export default TextInput;
