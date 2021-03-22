import './style.scss';
import CallBar from '../CallBar/CallBar';
import { useRoomHandler } from '../RoomHandler';
import { useEffect } from 'react';

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
			handler.connect({
				audio: true,
				video: {
					width: 1920,
					height: 1080,
					frameRate: 60,
					noiseSuppression: true
				}
			});
		}
	}, [room]);

	return (
		<div className="call-room">
			<CallBar
				participants={room ? room?.participants.size : 0}
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
