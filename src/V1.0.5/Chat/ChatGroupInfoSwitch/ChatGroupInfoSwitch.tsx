import { Popover } from '@material-ui/core';
import { PopoutProps } from '../../NavSidebar/NotificationPopout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types/state-types';
import Button from '../../components/Button/Button';
import { Avatar, Searchbar } from '../../components';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { UISelectors } from '../../../redux/selectors';
import { Maybe } from '../../../graphql';

const ChatGroupInfoSwitch = ({ anchor, setAnchor }: PopoutProps) => {
	const groups = useSelector((state: RootState) => state.user.user?.chatGroups);
	const selectedId = UISelectors.useSelectCurrentChatGroup();

	const [localGroups, setLocalGroups] = useState<
		{
			name: string;
			id: number;
			avatar?: Maybe<string>;
		}[]
	>([]);

	const history = useHistory();

	const [searchValue, setSearchValue] = useState('');

	const handleFilter = e => {
		setSearchValue(e.target.value);

		if (e.target.value.length <= 0) {
			if (groups) {
				setLocalGroups(groups);
			}
		} else {
			if (groups) {
				const newGroups = groups?.filter(group =>
					group.name.toLowerCase().includes(e.target.value.toLowerCase())
				);
				setLocalGroups(newGroups);
			}
		}
	};

	useEffect(() => {
		if (groups) {
			setLocalGroups(groups);
		}
	}, [groups]);

	return (
		<Popover
			style={{ marginLeft: '2rem' }}
			onClose={() => setAnchor(null)}
			open={anchor !== undefined && anchor !== null}
			anchorEl={anchor}
			anchorOrigin={{
				vertical: 'center',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			<div className="popout">
				<div className="settings" style={{ marginBottom: '1.5rem' }}>
					<Button
						clickHandler={() => alert('Not implemented')}
						content="Group Settings"
						size="large"
					/>
					<hr style={{ marginTop: '1rem', opacity: '0.2' }} />
				</div>
				<div className="header">
					<p>Switch Channels</p>
					<FontAwesomeIcon icon={faRandom} />
				</div>
				<Searchbar
					setValue={handleFilter}
					value={searchValue}
					size="fullwidth"
				/>
				<div className="groups">
					{localGroups.map((group, key) => (
						<div key={key}>
							<div className="group">
								<div>
									<Avatar
										className="small"
										src={group.avatar ?? ''}
										hasStatus={false}
										fallback={group.name[0]}
									/>
									<h4>{group.name}</h4>
									{group.id === (selectedId?.id ?? -1) && (
										<p className="selected">Selected</p>
									)}
								</div>
								<Button
									content="Jump"
									color="main"
									size="small"
									clickHandler={() => {
										setAnchor(null);
										history.push(`/chat/${group.id}`);
									}}
								/>
							</div>
							<hr />
						</div>
					))}
				</div>
			</div>
		</Popover>
	);
};

export default ChatGroupInfoSwitch;
