import { Searchbar } from '../../components';
import ChatGroupInfoBar from '../ChatGroupInfoBar/index';
import './style.scss';
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import NoContentMessage from './NoContentMessage';
import { useParams } from 'react-router-dom';
import { UIActions } from '../../../redux/actions/index';
import { useChatGroupQuery } from '../../../graphql';
import { UserSelectors } from '../../../redux/selectors';
import { useSetLastSelectedGroup } from '../../../hooks/useSetLastSelectedGroup';
import SectionChild from './SectionChild';

const ChatGroupSidebar = () => {
	const { lastchatid: groupId }: { lastchatid: string } = useParams();
	const setCurrentChatGroup = UIActions.useSetCurrentChatGroup();

	const [isAuthor, setIsAuthor] = useState(false);

	const authorId = UserSelectors.useSelectUserId()!;

	useSetLastSelectedGroup(parseInt(groupId));

	const { data, error, refetch } = useChatGroupQuery({
		variables: { id: parseInt(groupId) },
		onCompleted: d => {
			setCurrentChatGroup(d.chatGroup);
		}
	});

	if (error) {
		refetch();
	}

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (authorId) {
			if (authorId === data?.chatGroup.createdBy) {
				setIsAuthor(true);
			}
		}
	}, [authorId, data?.chatGroup.createdBy]);

	return (
		<div className="chat-group-sidebar">
			<ChatGroupInfoBar
				name={data?.chatGroup.name ?? ''}
				avatar={data?.chatGroup.avatar ?? ''}
			/>

			<div className="content">
				<Searchbar
					value={searchValue}
					setValue={setSearchValue}
					size="fullwidth"
				/>

				<div className="sections">
					<SectionHeader
						actionHandler={() => alert('not implemented')}
						content="FAVORITES"
						hasAction={false}
					/>
					<NoContentMessage />
					<SectionHeader
						actionHandler={() => alert('not implemented')}
						content="TEXT CHATS"
						hasAction={isAuthor}
					/>

					<div className="section-children">
						{data?.chatGroup.chats
							.filter(c => c?.mode === 'text chat')
							.map((chat, key) => (
								<SectionChild key={key} chat={chat} active={false} />
							))}
					</div>

					{data?.chatGroup.chats &&
						data?.chatGroup.chats.filter(c => c?.mode === 'text chat').length <
							1 && <NoContentMessage />}

					<SectionHeader
						actionHandler={() => alert('not implemented')}
						content="VOICE CHATS"
						hasAction={isAuthor}
					/>
					<NoContentMessage />

					<SectionHeader
						actionHandler={() => alert('not implemented')}
						content="SCHEDULED CHATS"
						hasAction={isAuthor}
					/>
					<NoContentMessage />
				</div>
			</div>
		</div>
	);
};

export default ChatGroupSidebar;
