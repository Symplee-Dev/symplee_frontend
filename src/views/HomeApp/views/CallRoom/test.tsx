const CallRoom = () => {
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
