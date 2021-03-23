import './style.scss';
import { UISelectors } from '../../../../../redux/selectors';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import MicOffSharpIcon from '@material-ui/icons/MicOffSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import VideocamOffSharpIcon from '@material-ui/icons/VideocamOffSharp';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { logger } from '../../../../../utils/logger';

const CallBar = ({
	disconnect,
	muteVideo,
	unMuteVideo,
	participants,
	muteAudio,
	unMuteAudio
}: {
	disconnect?: () => void;
	muteVideo: () => void;
	unMuteVideo: () => void;
	muteAudio: () => void;
	unMuteAudio: () => void;
	participants: number;
}) => {
	const currentChat = UISelectors.useSelectCurrentChat()!;
	const history = useHistory();

	const [videoMuted, setVideoMuted] = useState(false);
	const [audioMuted, setAudioMuted] = useState(false);

	const handleVideoMute = () => {
		if (videoMuted) {
			setVideoMuted(false);
			unMuteVideo();
		} else {
			setVideoMuted(true);
			muteVideo();
		}
	};

	const handleAudioMute = () => {
		if (audioMuted) {
			setAudioMuted(false);
			unMuteAudio();
		} else {
			setAudioMuted(true);
			muteAudio();
		}
	};

	if (!currentChat) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="call-bar">
			<div className="left">
				<h5>#{currentChat.name}</h5>
				<p>{participants + 1} members in the call</p>
			</div>
			<div className="middle">
				<button
					onClick={() => {
						if (disconnect) {
							logger.warning('Disconnecting');
							disconnect();
							history.goBack();
						}
					}}
				>
					Leave <ExitToAppSharpIcon />
				</button>
			</div>
			<div className="right">
				{audioMuted ? (
					<MicOffSharpIcon onClick={handleAudioMute} />
				) : (
					<MicSharpIcon onClick={handleAudioMute} />
				)}
				{videoMuted ? (
					<VideocamOffSharpIcon onClick={handleVideoMute} />
				) : (
					<VideocamSharpIcon onClick={handleVideoMute} />
				)}
			</div>
		</div>
	);
};

export default CallBar;
