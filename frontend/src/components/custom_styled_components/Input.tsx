import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	name: string;
}

const InputGroupStyle = styled.div``;

const input: React.FC<inputProps> = ({ label, id, name, ...rest }) => {
	return (
		<InputGroupStyle>
			<label htmlFor={`${id}-input`}>{label}</label>
			<input {...rest} id={`${id}-input`} name={name} />
		</InputGroupStyle>
	);
};

export default input;
