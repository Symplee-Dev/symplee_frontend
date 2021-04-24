import { useEffect } from 'react';

export const useSetLastSelectedGroup = (selectedId: number) => {
	console.log(selectedId, 'SELECTED');
	useEffect(() => {
		console.log('SETTING', selectedId);
		localStorage.setItem('LAST_SELECTED_GROUP', selectedId.toString());
	}, [selectedId]);
};
