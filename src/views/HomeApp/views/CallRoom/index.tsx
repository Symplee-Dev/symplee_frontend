import { connect, createLocalVideoTrack } from 'twilio-video';
import { jwt } from 'twilio';
import { UserSelectors } from '../../../../redux/selectors';

const ACCOUNT_SID = process.env.REACT_APP_TWILIO_ACCOUNT_SID!;
const TWILIO_API_KEY = process.env.REACT_APP_TWILIO_SECRET!;
const TWILIO_SID = process.env.REACT_APP_TWILIO_SID!;

const CallRoom = () => {
	const VideoGrant = jwt.AccessToken.VideoGrant;

	console.log(ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SID);

	const token = new jwt.AccessToken(ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SID, {
		identity: String(UserSelectors.useSelectUserId()!)
	});

	const grant = new VideoGrant({ room: 'call' });

	token.addGrant(grant);

	const accessToken = token.toJwt();

	console.log(accessToken);

	connect(accessToken, {
		name: 'call'
	}).then(room => {
		// createLocalVideoTrack()
		// 	.then(localVideoTrack => {
		// 		return room.localParticipant.publishTrack(localVideoTrack);
		// 	})
		// 	.then(publication => {
		// 		console.log('Successfully unmuted your video:', publication);
		// 	});

		console.log('Connected to Room "%s"', room.name);

		room.participants.forEach(participantConnected);
		room.on('participantConnected', p => {
			console.log('here');
			participantConnected(p);
		});

		room.on('participantDisconnected', participantDisconnected);
		room.once('disconnected', error =>
			room.participants.forEach(participantDisconnected)
		);
	});

	// createLocalVideoTrack().then(track => {
	// 	const localMediaContainer = document.getElementById(
	// 		'remote-media-div'
	// 	)!;
	// 	localMediaContainer.appendChild(track.attach());
	// });

	function participantConnected(participant) {
		console.log('Participant "%s" connected', participant.identity);

		const div = document.createElement('div');
		div.id = participant.sid;
		div.innerText = participant.identity;

		participant.on('trackSubscribed', track => trackSubscribed(div, track));
		participant.on('trackUnsubscribed', trackUnsubscribed);

		participant.tracks.forEach(publication => {
			if (publication.isSubscribed) {
				trackSubscribed(div, publication.track);
			}
		});

		document.getElementById('remote-media-div')?.appendChild(div);
	}

	function participantDisconnected(participant) {
		console.log('Participant "%s" disconnected', participant.identity);
		document?.getElementById(participant.sid)?.remove();
	}

	function trackSubscribed(div, track) {
		div.appendChild(track.attach());
	}

	function trackUnsubscribed(track) {
		track.detach().forEach(element => element.remove());
	}

	return (
		<div
			id="remote-media-div"
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				overflow: 'scroll'
			}}
		></div>
	);
};

export default CallRoom;
