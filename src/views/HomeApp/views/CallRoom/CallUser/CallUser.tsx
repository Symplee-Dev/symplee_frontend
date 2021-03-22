import './style.scss';
import { Avatar } from '@material-ui/core';
import { RemoteTrack } from 'twilio-video';

interface CallUserProps {
	id: string;
	tracks?: RemoteTrack[];
}

const CallUser = ({ id, tracks }: CallUserProps) => {
	//@ts-ignore

	return (
		<div className="call-user" id={id}>
			{!tracks ||
				(tracks && tracks.length < 1 && (
					<>
						<Avatar src="http://res.cloudinary.com/boltchat/image/upload/v1615999060/kelxramti1fulwb4qimm.jpg" />
						<p>NateTheDev#7069</p>
						{/* @ts-ignore */}
						{tracks && tracks[0] ? tracks[0].attach() : null}
					</>
				))}
		</div>
	);
};

export default CallUser;
