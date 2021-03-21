import { jwt } from 'twilio';

const ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID!;
const TWILIO_API_KEY = process.env.REACT_APP_TWILIO_SECRET!;
const TWILIO_SID = process.env.REACT_APP_TWILIO_SID!;

export const createRoomJWT = (roomName: string, username: string): string => {
	const VideoGrant = jwt.AccessToken.VideoGrant;

	const token = new jwt.AccessToken(ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SID, {
		identity: username
	});

	const grant = new VideoGrant({ room: roomName });

	token.addGrant(grant);

	return token.toJwt();
};
