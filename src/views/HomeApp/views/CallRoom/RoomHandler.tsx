import {
	ConnectOptions,
	Participant,
	RemoteParticipant,
	Room,
	Track
} from 'twilio-video';
import { logger } from '../../../../utils/logger';
import { createRoomJWT } from '../../../../utils/createRoomJWT';
import { connect as connectToRoom, RemoteTrack } from 'twilio-video';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/types/state-types';
import CallUser from '../CallRoom/CallUser/CallUser';
import { setegid } from 'node:process';
import { createLocalVideoTrack } from 'twilio-video';

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
}: RoomHandlerInterface): {
	handler: typeof handler;
	room: Room | undefined;
	elements: JSX.Element[];
} => {
	const user = useSelector((state: RootState) => state.user.user)!;
	console.log(user);
	const accessToken = createRoomJWT(
		`${chatGroupId}-${chatId}`,
		`${user.username}#${user.key}`
	);
	const [globalRoom, setRoom] = useState<Room>();
	const [elements, setElements] = useState<{ [id: string]: JSX.Element }>({});

	const handler = {
		connect: async (options: ConnectOptions): Promise<boolean> => {
			const room: Room = await connectToRoom(accessToken, {
				...options,
				name: `${chatGroupId}-${chatId}`,
				video: { width: 300 }
			}).catch(err => logger.error(err));
			logger.success('Connected to room!');

			setRoom(room);

			await createLocalVideoTrack().then(localVideoTrack => {
				logger.warning(JSON.stringify(elements));
				setElements(prev => {
					return {
						...prev,
						'local-user': (
							<CallUser
								key="local-user"
								id="local-user"
								tracks={[]}
							/>
						)
					};
				});
				logger.warning(JSON.stringify(elements));
				const targetP = document.getElementById('local-user');

				//@ts-ignore
				// room.localParticipant.publishTrack(localVideoTrack);
				targetP?.appendChild(localVideoTrack.attach());
			});

			if (room.participants) {
				room.participants.forEach(handler.participantConnected);
			}

			room.on('participantConnected', handler.participantConnected);

			room.on('participantDisconnected', handler.participantDisconnected);

			room.once('disconnected', error =>
				room.participants.forEach(handler.participantDisconnected)
			);

			return true;
		},

		participantConnected: (participant: RemoteParticipant): void => {
			logger.info(participant.identity);

			logger.warning(JSON.stringify(elements));
			setElements(prev => {
				return {
					...prev,
					[participant.sid]: (
						<CallUser
							key={participant.sid}
							id={participant.sid}
							tracks={[]}
						/>
					)
				};
			});

			participant.on('trackSubscribed', track => {
				const targetP = document.getElementById(participant.sid);

				//@ts-ignore
				targetP?.appendChild(track.attach());

				// setElements({
				// 	...elements,
				// 	[participant.sid]: (
				// 		<CallUser
				// 			id={participant.sid}
				// 			tracks={[
				// 				...(targetP ? targetP.props.tracks : []),
				// 				track
				// 			]}
				// 			key={participant.sid}
				// 		></CallUser>
				// 	)
				// });
			});

			participant.on('trackUnsubscribed', handler.trackUnsubscribed);

			const targetP = document.getElementById(participant.sid);

			participant.tracks.forEach(publication => {
				console.log(publication.track);

				if (publication.isSubscribed) {
					if (publication.track) {
						//@ts-ignore
						targetP?.appendChild(publication.track.attach());
					}
				}
			});
		},
		participantDisconnected: (participant): void => {
			logger.warning(
				'Participant "%s" disconnected',
				participant.identity
			);
			// const target = document?.getElementById(participant.sid);
			// if (target) {
			// 	target.remove();
			// }
			delete elements[participant.sid];
		},
		trackUnsubscribed: (track): void => {
			track.detach().forEach(element => element.remove());
		}
	};

	return { handler, room: globalRoom, elements: Object.values(elements) };
};
