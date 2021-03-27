import './style.scss';
import { Avatar } from '@material-ui/core';
import { RemoteTrack } from 'twilio-video';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types/state-types';

interface CallUserProps {
	id: string;
	tracks?: RemoteTrack[];
	identity?: string;
	avatar?: string;
}

const CallUser = ({
	id,
	tracks,
	identity = '',
	avatar = ''
}: CallUserProps) => {
	//@ts-ignore
	const [hasVideo, setHasVideo] = useState(false);
	const localAvatar = useSelector(
		(state: RootState) => state.user.user?.avatar
	);

	useEffect(() => {
		setInterval(() => {
			if (
				document.getElementById(id) &&
				document.getElementById(id)!.getElementsByTagName('video')
					.length > 0
			) {
				setHasVideo(true);
			} else {
				setHasVideo(false);
			}
		}, 300);
	}, []);

	return (
		<div className="call-user" id={id}>
			{!tracks ||
				(tracks && tracks.length < 1 && !hasVideo && (
					<>
						<Avatar
							src={id === 'local-user' ? localAvatar : avatar}
						>
							{identity[0]}
						</Avatar>
						<p>{identity}</p>
						{/* @ts-ignore */}
					</>
				))}
		</div>
	);
};

export default CallUser;
