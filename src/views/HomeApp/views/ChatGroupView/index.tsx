import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useChatGroupQuery } from '../../../../graphql';
import { LinearProgress } from '@material-ui/core';
import Header from './Header';
import ChatGroupsList from './ChatGroupsList';
import { useState, useEffect } from 'react';
import EditModal from './EditModal';

const ChatGroupIndex = ({ authorId }: { authorId: number }) => {
	const { id }: { id: string } = useParams();
	const [isAuthor, setIsAuthor] = useState(false);

	const [editing, setEditing] = useState(false);

	const { data, loading, error, refetch } = useChatGroupQuery({
		variables: { id: parseInt(id) }
	});

	if (error) {
		refetch();
	}

	useEffect(() => {
		if (authorId === data?.chatGroup.createdBy) {
			setIsAuthor(true);
		}
	}, [authorId, data?.chatGroup.createdBy]);

	if (loading) return <LinearProgress color="primary" />;

	return (
		<motion.div exit={{ opacity: 0 }} className="chat-group-root">
			<Header
				name={data?.chatGroup.name ?? ''}
				isAuthor={isAuthor}
				openEdit={setEditing}
			/>
			<ChatGroupsList
				id={parseInt(id)}
				chats={data?.chatGroup.chats ?? []}
				isAuthor={isAuthor}
				refetch={refetch}
			/>
			{editing && data?.chatGroup && (
				<EditModal
					group={{ ...data.chatGroup }}
					open={editing}
					setOpen={setEditing}
					refetch={refetch}
				/>
			)}
		</motion.div>
	);
};

export default ChatGroupIndex;
