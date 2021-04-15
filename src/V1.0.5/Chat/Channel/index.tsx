import { UIActions } from '../../../redux/actions/index';
import './style.scss';

const Channel = ({
	chat
}: {
	chat:
		| {
				id: number;
				name: string;
				icon: string;
				isPublic: boolean;
				mode: string;
		  }
		| undefined;
}) => {
	const setCurrentChat = UIActions.useSetCurrentChat();

	setCurrentChat(chat);

	return <div className="channel"></div>;
};

export default Channel;
