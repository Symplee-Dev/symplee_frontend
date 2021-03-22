import './style.scss';
import CallBar from '../CallBar/CallBar';
import CallUser from '../CallUser/CallUser';
import { useRoomHandler } from '../RoomHandler';
import { useEffect } from 'react';

const Call = ({
	chatGroupId,
	chatId
}: {
	chatGroupId: number;
	chatId: number;
}) => {
	const { handler, room, elements } = useRoomHandler({ chatGroupId, chatId });

	useEffect(() => {
		if (!room) {
			console.log('here');
			handler.connect({});
		}
	}, [room]);

	return (
		<div className="call-room">
			<CallBar />
			<div className="call-members">{elements}</div>
		</div>
	);
};

export default Call;
