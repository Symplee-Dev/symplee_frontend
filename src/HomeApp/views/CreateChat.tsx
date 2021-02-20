import { motion } from 'framer-motion';

const CreateChat = () => {
	return (
		<motion.div exit={{ opacity: 0 }} className="create-chat">
			<h1>Create a chat</h1>
		</motion.div>
	);
};

export default CreateChat;
