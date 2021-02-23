import { TextField } from '@material-ui/core';
export const createTextField = (
	onChange: (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void,
	name: string,
	value: string,
	labelTitle: string,
	type: string = 'text',
	withLabel: boolean = true,
	className: string = 'input-field'
) => {
	return (
		<>
			{withLabel && <p className="input-title">{labelTitle}</p>}
			<TextField
				required
				color="primary"
				name={name}
				variant="filled"
				className={className}
				type={type}
				value={value}
				onChange={e => onChange(e)}
				inputProps={{
					className: 'input-field'
				}}
			/>
		</>
	);
};
