import { faEllipsisH, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { useState, useEffect } from 'react';

type SearchbarProps = {
	value: string;
	setValue: (val: string) => void;
	size: 'small' | 'medium' | 'fullwidth';
	placeHolder?: string;
};

export const Searchbar = ({
	setValue,
	size,
	value,
	placeHolder = 'Search'
}: SearchbarProps) => {
	const [displayProps, setDisplayProps] = useState({
		search: true,
		elipses: false
	});

	useEffect(() => {
		if (value.length > 0) {
			setDisplayProps({ search: false, elipses: true });
		} else {
			setDisplayProps({ search: true, elipses: false });
		}
	}, [value]);

	return (
		<div className="searchbar">
			<FontAwesomeIcon
				icon={faSearch}
				style={{ display: displayProps.search ? 'block' : 'none' }}
				className={`search-icon ${value.length > 0 && 'hasValue'}`}
			/>

			<FontAwesomeIcon
				icon={faEllipsisH}
				style={{ display: value.length > 0 ? 'block' : 'none' }}
				className={`search-icon ${
					value.length > 0 ? 'hasValueElipses' : 'hasValue'
				}`}
			/>

			<input
				placeholder={placeHolder}
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	);
};
