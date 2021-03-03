import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useChatGroupQuery } from '../../../../graphql';
import { LinearProgress } from '@material-ui/core';
import { UIActions } from '../../../../redux/actions/index';

const ChatGroupIndex = ({ authorId }: { authorId: number }) => {
	const { id }: { id: string } = useParams();
	const [isAuthor, setIsAuthor] = useState(false);
	const setCurrentChatGroup = UIActions.useSetCurrentChatGroup();

	// const [editing, setEditing] = useState(false);

	const { data, loading, error, refetch } = useChatGroupQuery({
		variables: { id: parseInt(id) },
		onCompleted: d => {
			setCurrentChatGroup(d.chatGroup);
		}
	});

	if (error) {
		refetch();
	}

	useEffect(() => {
		if (authorId === data?.chatGroup.createdBy) {
			setIsAuthor(true);
		}
	}, [authorId, data?.chatGroup.createdBy]);

	if (loading)
		return <LinearProgress style={{ width: '100%' }} color="primary" />;

	return <motion.div className="chat-group-index"></motion.div>;
};

export default ChatGroupIndex;
