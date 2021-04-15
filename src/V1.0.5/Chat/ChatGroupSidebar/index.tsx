import { Searchbar } from '../../components';
import ChatGroupInfoBar from '../ChatGroupInfoBar/index';
import './style.scss';
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import NoContentMessage from './NoContentMessage';
import { useParams } from 'react-router-dom';
import { UIActions } from '../../../redux/actions/index';
import { useChatGroupQuery, Maybe } from '../../../graphql';
import { UserSelectors } from '../../../redux/selectors';
import { useSetLastSelectedGroup } from '../../../hooks/useSetLastSelectedGroup';
import SectionChild from './SectionChild';

const ChatGroupSidebar = () => {
	const { lastchatid: groupId }: { lastchatid: string } = useParams();
	const setCurrentChatGroup = UIActions.useSetCurrentChatGroup();

	const [isAuthor, setIsAuthor] = useState(false);

	const authorId = UserSelectors.useSelectUserId()!;

	const [localChats, setLocalChats] = useState<
		Maybe<{
			id: number;
			name: string;
			icon: string;
			isPublic: boolean;
			mode: string;
		}>[]
	>([]);

	console.log('About to set', groupId);
	useSetLastSelectedGroup(parseInt(groupId));

	const { data, error, refetch } = useChatGroupQuery({
		variables: { id: parseInt(groupId) },
		onCompleted: d => {
			console.log(d.chatGroup.id);
			setCurrentChatGroup(d.chatGroup);
		}
	});

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (authorId) {
			if (authorId === data?.chatGroup.createdBy) {
				setIsAuthor(true);
			}
		}
	}, [authorId, data?.chatGroup.createdBy]);

	const handleFilter = e => {
		setSearchValue(e.target.value);

		if (e.target.value.length <= 0) {
			if (data && data.chatGroup.chats) {
				setLocalChats(data.chatGroup.chats);
			}
		} else {
			if (data?.chatGroup.chats) {
				const newChats = data.chatGroup.chats.filter(chat =>
					chat?.name.toLowerCase().includes(e.target.value.toLowerCase())
				);
				setLocalChats(newChats);
			}
		}
	};

	useEffect(() => {
		if (data?.chatGroup.chats) {
			setLocalChats(data.chatGroup.chats);
		}
	}, [data?.chatGroup.chats]);

	return (
		<div className="chat-group-sidebar">
			<ChatGroupInfoBar
				name={data?.chatGroup.name ?? ''}
				avatar={data?.chatGroup.avatar ?? ''}
			/>

			<div className="content">
				<Searchbar
					value={searchValue}
					setValue={e => handleFilter(e)}
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
						{localChats
							.filter(
								c =>
									c?.mode === 'text chat' &&
									c.isPublic &&
									localChats.includes(c)
							)
							.map((chat, key) => (
								<SectionChild key={key} chat={chat} />
							))}
					</div>

					{data?.chatGroup.chats &&
						localChats.filter(
							c =>
								c?.mode === 'text chat' && c.isPublic && localChats.includes(c)
						).length < 1 && <NoContentMessage />}

					<SectionHeader
						actionHandler={() => alert('not implemented')}
						content="VOICE CHATS"
						hasAction={isAuthor}
					/>
					<div className="section-children">
						{localChats
							.filter(
								c =>
									c?.mode.toLowerCase().includes('voice') &&
									c.isPublic &&
									localChats.includes(c)
							)
							.map((chat, key) => (
								<SectionChild key={key} chat={chat} />
							))}
					</div>
					{localChats &&
						localChats.filter(
							c =>
								c?.mode.toLowerCase().includes('voice') &&
								localChats.includes(c)
						).length < 1 && <NoContentMessage />}

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
