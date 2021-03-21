import './style.scss';
import { Avatar } from '@material-ui/core';

interface CallUserProps {
	id: string;
}

const CallUser = ({ id }: CallUserProps) => {
	return (
		<div className="call-user" id={id}>
			<Avatar src="http://res.cloudinary.com/boltchat/image/upload/v1615999060/kelxramti1fulwb4qimm.jpg" />
			<p>NateTheDev#7069</p>
		</div>
	);
};

export default CallUser;
