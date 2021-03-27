import { useState, useEffect } from 'react';

export const useKeepInView = (behaviour: 'auto' | 'smooth') => {
	const [end, setEnd] = useState<HTMLDivElement | null>(null);

	return [setEnd];
};

export const useScroll = (): [
	number,
	React.Dispatch<React.SetStateAction<number>>
] => {
	const [scrollPos, setScrollPos] = useState(0);

	return [scrollPos, setScrollPos];
};
