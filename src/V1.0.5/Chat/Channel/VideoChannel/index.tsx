import './index.scss';
import { useRoomHandler } from './hooks/RoomHandler';
import { UISelectors } from '../../../../redux/selectors';
import { useEffect } from 'react';
import CallBar from './CallBar/CallBar';

const VideoChannel = () => {
	const chatId = UISelectors.useSelectCurrentChat()?.id!;
	const chatGroupId = UISelectors.useSelectCurrentChatGroup()?.id!;

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
		<div className="voice-channel">
			<CallBar
				muteAudio={handler.muteAudio}
				unMuteAudio={handler.unmuteAudio}
				participants={room ? room?.participants.size : 0}
				unMuteVideo={() => handler.unmuteVideo()}
				disconnect={() => {
					const roo = room?.disconnect();
					setRoom(roo);
					handler.disconnecting();
				}}
				muteVideo={() => handler.muteVideo()}
			/>
			<div className="call-members">{elements}</div>
		</div>
	);
};

export default VideoChannel;
