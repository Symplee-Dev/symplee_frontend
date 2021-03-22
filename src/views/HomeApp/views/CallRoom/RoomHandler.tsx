import {
	ConnectOptions,
	LocalVideoTrack,
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
	setRoom: React.Dispatch<React.SetStateAction<Room | undefined>>;
} => {
	const user = useSelector((state: RootState) => state.user.user)!;
	console.log(user);
	const accessToken = createRoomJWT(
		`${chatGroupId}-${chatId}`,
		`${user.username}#${user.key}`
	);
	const [globalRoom, setRoom] = useState<Room>();
	const [elements, setElements] = useState<{ [id: string]: JSX.Element }>({});
	const [localTrack, setLocalTrack] = useState<LocalVideoTrack>();

	const handler = {
		connect: async (options: ConnectOptions): Promise<boolean> => {
			const room: Room = await connectToRoom(accessToken, {
				...options,
				name: `${chatGroupId}-${chatId}`
			}).catch(err => logger.error(err));
			logger.success('Connected to room!');

			setRoom(room);

			createLocalVideoTrack().then(localVideoTrack => {
				logger.warning(JSON.stringify(elements));
				setLocalTrack(localVideoTrack);
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
				publication.on('subscribed', handler.handleTrackDisabled);
			});
		},
		handleTrackDisabled: (track: RemoteTrack) => {
			track.on('disabled', () => {
				//@ts-ignore
				track.detach().forEach(element => element.remove());
			});
		},
		participantDisconnected: (participant): void => {
			logger.info('Leaving call');
			logger.warning(
				'Participant "%s" disconnected',
				participant.identity
			);

			setElements(prev => {
				let result = {};

				for (const [key, val] of Object.entries(prev)) {
					if (key !== participant.sid) {
						result[key] = val;
					}
				}

				return result;
			});
		},
		disconnecting: () => {
			localTrack?.disable();
			localTrack?.stop();
			localTrack?.detach().forEach(element => element.remove());
			globalRoom?.localParticipant.videoTracks.forEach(publication => {
				logger.info(publication);
				publication.track.disable();
				//@ts-ignore

				publication.track.detach().forEach(element => element.remove());
				publication.track.stop();
				publication.unpublish();
			});

			setElements(prev => {
				let result = {};

				for (const [key, val] of Object.entries(prev)) {
					if (key !== 'local-user') {
						result[key] = val;
					}
				}

				return result;
			});
		},
		trackUnsubscribed: (track): void => {
			track.detach().forEach(element => element.remove());
		},
		muteAudio: (): void => {
			globalRoom?.localParticipant.audioTracks.forEach(publication => {
				logger.info(publication);
				publication.track.disable();
				publication.track.stop();
				publication.unpublish();
			});
		},
		unmuteAudio: (): void => {
			globalRoom?.localParticipant.audioTracks.forEach(publication => {
				publication.track.enable();
				publication.track.restart();
			});
		},
		muteVideo: (): void => {
			logger.info('Disabling video');
			localTrack?.disable();
			localTrack?.stop();
			localTrack?.detach().forEach(element => element.remove());
			globalRoom?.localParticipant.videoTracks.forEach(publication => {
				logger.info(publication);
				publication.track.disable();
				//@ts-ignore

				publication.track.detach().forEach(element => element.remove());
				publication.track.stop();
				publication.unpublish();
			});
		},
		unmuteVideo: (): void => {
			createLocalVideoTrack()
				.then(localVideoTrack => {
					setLocalTrack(localVideoTrack);

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

					const targetP = document.getElementById('local-user');

					targetP?.appendChild(localVideoTrack.attach());

					return globalRoom?.localParticipant.publishTrack(
						localVideoTrack
					);
				})
				.then(publication => {
					console.log(
						'Successfully unmuted your video:',
						publication
					);
				});
		}
	};

	return {
		handler,
		room: globalRoom,
		elements: Object.values(elements),
		setRoom
	};
};
