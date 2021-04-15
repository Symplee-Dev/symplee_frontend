import './TextChat.scss';

const TextChat = ({
	chat
}: {
	chat: {
		id: number;
		name: string;
		icon: string;
		isPublic: boolean;
		mode: string;
	};
}) => {
	return <div className="text-chat"></div>;
};

export default Text;
