import { Maybe } from '../../../graphql';
import Message from './Message';
import './Messages.scss';
import { useEffect } from 'react';

const Messages = ({
	messages,
	setEnd,
	end,
	firstLoad,
	setFirstLoad
}: {
	messages: Maybe<{
		id: number;
		body: string;
		createdAt: string;
		author: {
			id: number;
			username: string;
			avatar?: string | undefined;
		};
	}>[];
	end: HTMLSpanElement | null;
	setEnd: React.Dispatch<React.SetStateAction<HTMLSpanElement | null>>;
	firstLoad: boolean;
	setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	useEffect(() => {
		if (end && firstLoad) {
			end.scrollIntoView({
				behavior: 'auto',
				block: 'nearest',
				inline: 'start'
			});
			setFirstLoad(false);
			return;
		}
		if (end) {
			end.scrollIntoView({
				behavior: 'auto',
				block: 'nearest',
				inline: 'start'
			});
		}
	}, [messages, end, firstLoad, setFirstLoad]);

	return (
		<div className="messages">
			{messages.map((m, key) => (
				<Message
					key={key}
					showHeader={!(messages[key - 1]?.author.id === m?.author.id)}
					message={m}
				/>
			))}
			<span ref={el => setEnd(el)}></span>
		</div>
	);
};

export default Messages;
