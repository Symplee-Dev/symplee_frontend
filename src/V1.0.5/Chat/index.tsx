import ChatGroupSidebar from './ChatGroupSidebar';
import { UISelectors } from '../../redux/selectors';
import { Route, Switch } from 'react-router-dom';

const Chat = () => {
	return (
		<div className="chat">
			<ChatGroupSidebar />
		</div>
	);
};

export default Chat;
