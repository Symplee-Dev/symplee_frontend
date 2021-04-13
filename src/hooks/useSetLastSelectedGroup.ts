import { useEffect } from 'react';

export const useSetLastSelectedGroup = (selectedId: number) => {
	console.log(selectedId, 'SELECTED');
	useEffect(() => {
		localStorage.setItem('LAST_SELECTED_GROUP', selectedId.toString());
	}, [selectedId]);
};
