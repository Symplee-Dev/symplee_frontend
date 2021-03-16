import { UserProps, FormProps } from './Account';

import { NameField } from './NameField';
import { UserNameField } from './UserNameField';

export interface AccountFormProps {
	user: UserProps;
	formState: FormProps;
	setFormState: React.Dispatch<React.SetStateAction<FormProps>>;
}

export const AccountForm = ({
	user,
	formState,
	setFormState
}: AccountFormProps) => {
	return (
		<>
			<NameField
				user={user}
				formState={formState}
				setFormState={setFormState}
			/>
			{/* Can uncomment when mutation is fixed, handle email in use */}
			{/* <div className="row">
						<div>
							<p>Email</p>
							{user.email === formState.email ? (
								''
							) : (
								<Tooltip placement="top" title="Undo">
									<UndoIcon
										className="undo"
										style={{ color: '#F2A813' }}
										onClick={() =>
											setFormState({
												...formState,
												email: user.email
											})
										}
									/>
								</Tooltip>
							)}
						</div>
						<TextField
							color="primary"
							style={{ width: '100%' }}
							type="email"
							variant="filled"
							value={formState?.email}
							onChange={e =>
								setFormState({
									...formState,
									email: e.target.value
								})
							}
							inputProps={{ className: 'input-field' }}
						/>
					</div> */}
			<UserNameField
				user={user}
				formState={formState}
				setFormState={setFormState}
			/>
		</>
	);
};
