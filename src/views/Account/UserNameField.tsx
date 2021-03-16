import { Tooltip, TextField } from '@material-ui/core';
import { AccountFormProps } from './AccountForm';
import UndoIcon from '@material-ui/icons/Undo';

export const UserNameField = ({
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
					Username
				</p>
				{user.username === formState.username ? (
					''
				) : (
					<Tooltip placement="top" title="Undo">
						<UndoIcon
							className="undo"
							style={{ color: '#F2A813' }}
							onClick={() =>
								setFormState({
									...formState,
									username: user.username
								})
							}
						/>
					</Tooltip>
				)}
			</div>
			<TextField
				style={{ width: '100%' }}
				onChange={e =>
					setFormState({
						...formState,
						username: e.target.value
					})
				}
				color="primary"
				variant="filled"
				type="text"
				value={formState?.username}
				inputProps={{ className: 'input-field' }}
			/>
		</div>
	);
};
