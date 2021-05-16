import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { UISelectors } from '../../../../../redux/selectors';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import MicOffSharpIcon from '@material-ui/icons/MicOffSharp';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import { VideocamOff } from '@material-ui/icons';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
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
				<h5>
					#{currentChat.name} {currentChat.icon}
				</h5>
				<p>{participants + 1} members in the call</p>
			</div>
			<div className="middle">
				<button
					onClick={() => {
						logger.warning('Disconnecting');
						//@ts-ignore
						disconnect();
						history.goBack();
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
					<VideocamOff onClick={handleVideoMute} />
				) : (
					<VideocamSharpIcon onClick={handleVideoMute} />
				)}
			</div>
		</div>
	);
};

export default CallBar;
