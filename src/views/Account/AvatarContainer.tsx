import { Avatar, LinearProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import randomHex from 'random-hex';

import { UserProps, FormProps } from './Account';

interface AvatarContainerProps {
	user: UserProps;
	formState: FormProps;
	imageLoading: boolean;
	handleImageUpload: (
		e: React.ChangeEvent<HTMLInputElement>
	) => Promise<void>;
}
export const AvatarContainer = ({
	user,
	formState,
	imageLoading,
	handleImageUpload
}: AvatarContainerProps) => {
	return (
		<div className="avatar-container">
			<div className="avatar-icon">
				<Avatar
					style={
						!formState.avatar
							? {
									background: randomHex.generate()
							  }
							: undefined
					}
					src={formState.avatar}
				>
					{!formState.avatar && user.username[0]}
				</Avatar>
			</div>
			<div className="change-avatar-root">
				{!imageLoading ? (
					<label className="file-upload-root">
						<input
							onChange={e => handleImageUpload(e)}
							type="file"
							accept="image/*"
							style={{ border: 'none' }}
						/>
						Change Avatar{' '}
						<CloudUploadIcon
							style={{
								marginLeft: '0.5rem'
							}}
						/>
					</label>
				) : (
					<>
						<LinearProgress
							color="primary"
							style={{
								marginTop: '1rem',
								marginBottom: '0.5rem'
							}}
						/>
						<p>Uploading Image...</p>
					</>
				)}
			</div>
		</div>
	);
};
