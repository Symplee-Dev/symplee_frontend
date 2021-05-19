import React from 'react';
import './style.scss';

interface Props {}

const index: React.FC<Props> = ({ children }) => {
	return <div id="modalContainer">{children}</div>;
};

export default index;
