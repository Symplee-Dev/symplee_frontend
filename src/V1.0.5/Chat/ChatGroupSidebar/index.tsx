import { Searchbar } from '../../components';
import ChatGroupInfoBar from '../ChatGroupInfoBar/index';
import './style.scss';
import { useState } from 'react';
import SectionHeader from './SectionHeader';

const ChatGroupSidebar = () => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="chat-group-sidebar">
			<ChatGroupInfoBar />

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
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatGroupSidebar;
