import { Tooltip, TextField } from '@material-ui/core';
import { AccountFormProps } from './AccountForm';
import UndoIcon from '@material-ui/icons/Undo';

export const NameField = ({
	user,
	formState,
	setFormState
}: AccountFormProps) => {
	return (
		<div className="row">
			<div>
				<p
					style={{
						color: '#BB86FC',
						fontWeight: 'bold'
					}}
				>
					Name{' '}
				</p>
				{user.name === formState.name ? (
					''
				) : (
					<Tooltip placement="top" title="Undo">
						<UndoIcon
							className="undo"
							style={{ color: '#F2A813' }}
							onClick={() =>
								setFormState({
									...formState,
									name: user.name
								})
							}
						/>
					</Tooltip>
				)}
			</div>
			<TextField
				color="primary"
				style={{ width: '100%' }}
				onChange={e =>
					setFormState({
						...formState,
						name: e.target.value
					})
				}
				type="text"
				variant="filled"
				value={formState?.name}
				inputProps={{ className: 'input-field' }}
			/>
		</div>
	);
};
