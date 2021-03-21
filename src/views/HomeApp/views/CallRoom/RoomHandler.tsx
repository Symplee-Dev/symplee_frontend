import { ConnectOptions, Room } from 'twilio-video';
import { logger } from '../../../../utils/logger';
import { createRoomJWT } from '../../../../utils/createRoomJWT';
import { connect as connectToRoom } from 'twilio-video';
import { UserSelectors } from '../../../../redux/selectors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';

// export class RoomHandler {
// 	roomId!: number;
// 	accessToken!: string;
// 	room!: Room;
// 	chatGroupId!: number;
// 	chatId!: number;
// 	userId!: number;

// 	constructor({ chatGroupId, chatId, userId }: RoomHandlerInterface) {
// 		this.chatGroupId = chatGroupId;
// 		this.chatId = chatId;
// 		this.userId = userId;
// 		this.accessToken = createRoomJWT(`${chatGroupId}-${chatId}`, userId);
// 	}

// 	async connect(): Promise<boolean> {
// 		await connectToRoom(this.accessToken, {
// 			name: 'call'
// 		}).then(room => {
// 			room.participants.forEach(participantConnected);

// 			room.on('participantConnected', p => {
// 				participantConnected(p);
// 			});

// 			room.on('participantDisconnected', participantDisconnected);
// 			room.once('disconnected', error =>
// 				room.participants.forEach(participantDisconnected)
// 			);
// 		});

// 		return true;
// 	},

// }

interface RoomHandlerInterface {
	chatGroupId: number;
	chatId: number;
}

export const useRoomHandler = ({
	chatGroupId,
	chatId
}: RoomHandlerInterface): { handler: typeof handler; room: Room } => {
	const user = useSelector((state: RootState) => state.user.user);
	const accessToken = createRoomJWT(
		`${chatGroupId}-${chatId}`,
		`${user.username}#${user.key}`
	);
	const [room, setRoom] = useState<Room>();
	const [elements, setElements] = useState<Element[]>();

	const handler = {
		connect: async (options: ConnectOptions): Promise<boolean> => {
			const room = await connectToRoom(accessToken, options).catch(err =>
				logger.error(err)
			);

			logger.success('Connected to room!');

			setRoom(room);

			room.participants.forEach(handler.participantConnected);

			room.on('participantConnected', handler.participantConnected);

			room.on('participantDisconnected', handler.participantDisconnected);

			room.once('disconnected', error =>
				room.participants.forEach(handler.participantDisconnected)
			);

			return true;
		},

		participantConnected: (participant): void => {
			logger.info('Participant "%s" connected', participant.identity);
			// const div = document.createElement('div');
			// div.id = participant.sid;
			// div.innerText = participant.identity;

			// participant.on('trackSubscribed', track =>
			// 	handler.trackSubscribed(div, track)
			// );

			// participant.on('trackUnsubscribed', trackUnsubscribed);

			// participant.tracks.forEach(publication => {
			// 	if (publication.isSubscribed) {
			// 		handler.trackSubscribed(div, publication.track);
			// 	}
			// });

			// document.getElementById('remote-media-div')?.appendChild(div);
		},
		participantDisconnected: (participant): void => {
			logger.warning(
				'Participant "%s" disconnected',
				participant.identity
			);

			// document?.getElementById(participant.sid)?.remove();
		},
		trackSubscribed: (div, track): void => {
			// div.appendChild(track.attach());
		},

		trackUnsubscribed: (track): void => {
			// track.detach().forEach(element => element.remove());
		}
	};

	return { handler, room };
};
