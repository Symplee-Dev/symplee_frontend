import React from 'react';
import ChatRoomList from '../../components/ChatRoomList';
import ChatWindow from '../../components/ChatWindow';
import FriendList from '../../components/FriendList';

interface UserUiProps {}

const UserUi: React.FC<UserUiProps> = () => {
	return (
		<>
			{/* List Chat Rooms */}
			<ChatRoomList />
			{/* Chat Window */}
			<ChatWindow />
			{/* Users Online */}
			<FriendList />
		</>
	);
};

export default UserUi;
