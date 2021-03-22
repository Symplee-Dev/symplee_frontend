import './style.scss';
import CallBar from '../CallBar/CallBar';
import { useRoomHandler } from '../RoomHandler';
import { useEffect } from 'react';
import { logger } from '../../../../../utils/logger';

const Call = ({
	chatGroupId,
	chatId
}: {
	chatGroupId: number;
	chatId: number;
}) => {
	const { handler, room, elements, setRoom } = useRoomHandler({
		chatGroupId,
		chatId
	});

	useEffect(() => {
		if (!room) {
			console.log('here');
			handler.connect({});
		}
	}, [room]);

	return (
		<div className="call-room">
			<CallBar
				unMuteVideo={() => handler.unmuteVideo()}
				disconnect={() => {
					if (room) {
						const roo = room.disconnect();
						setRoom(roo);
						handler.disconnecting();
					}
				}}
				muteVideo={() => handler.muteVideo()}
			/>
			<div className="call-members">{elements}</div>
		</div>
	);
};

export default Call;
