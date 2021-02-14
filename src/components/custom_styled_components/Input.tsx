import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	label: string;
	name: string;
}

const InputGroupStyle = styled.div``;

const input: React.FC<inputProps> = ({ label, id = '', name, ...rest }) => {
	const newId = id ? `${id}-input` : `${name}-input`;

	return (
		<InputGroupStyle>
			<label htmlFor={newId}>{label}</label>
			<input {...rest} id={newId} name={name} />
		</InputGroupStyle>
	);
};

export default input;
