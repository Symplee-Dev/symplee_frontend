import { useState } from 'react';
import axios from 'axios';

export const useImageUpload = (): [(e) => Promise<string>, boolean] => {
	const [imageLoading, setImageLoading] = useState(false);

	return [
		async (e): Promise<string> => {
			const files = e.target.files;
			const data = new FormData();

			data.append('file', files[0]);
			data.append(
				'upload_preset',
				process.env.REACT_APP_CLOUDINARY_UPLOAD_TARGET ?? ''
			);
			data.append(
				'api_key',
				process.env.REACT_APP_CLOUDINARY_API_KEY ?? ''
			);
			data.append('timestamp', Date.now().toString());
			setImageLoading(true);
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/boltchat/image/upload',
				data
			);

			setImageLoading(false);

			return res.data.url;
		},
		imageLoading
	];
};
