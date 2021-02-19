export interface ImgUploadProps {}

const API_KEY = null;

const ImgUpload: React.SFC<ImgUploadProps> = () => {
	const handleImage = async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'tweeter');
		data.append('api_key', API_KEY);
	};
	return (
		<div>
			<input type="file" accept="image/*" onChange={handleImage} />
		</div>
	);
};

export default ImgUpload;
