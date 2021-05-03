import { RemoteTrack } from 'twilio-video';
import './style.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/types/state-types';
import { Avatar } from '../../../../components/Avatar/Avatar';

export interface CallUserProps {
	id: string;
	tracks?: RemoteTrack[];
	identity?: string;
	avatar?: string;
}

const CallUser = ({ id, tracks, avatar, identity }: CallUserProps) => {
	const [hasVideo, setHasVideo] = useState(false);
	const localAvatar = useSelector(
		(state: RootState) => state.user.user?.avatar
	);

	useEffect(() => {
		setInterval(() => {
			if (
				document.getElementById(id) &&
				document.getElementById(id)!.getElementsByTagName('video').length > 0
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
							fallback={(identity && identity[0]) ?? ''}
							src={(id === 'local-user' ? localAvatar : avatar) ?? ''}
							hasStatus={false}
						/>
						<p>{identity}</p>
					</>
				))}
		</div>
	);
};

export default CallUser;
