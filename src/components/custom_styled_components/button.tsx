import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface buttonProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	label: string;
	name: string;
}

const customButton = styled.button``;

const styledButton = () => {
	return <button></button>;
};
export default styledButton;
