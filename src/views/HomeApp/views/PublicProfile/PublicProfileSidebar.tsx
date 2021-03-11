import './styles.scss';
import { UISelectors } from '../../../../redux/selectors';

const PublicProfileSidebar = () => {
	const currentProfile = UISelectors.useSelectCurrentProfile();

	return (
		<div className="public-profile-sidebar">
			<div className="top">
				<h3>Profile</h3>
			</div>
			<div className="content">
				<h4>User Actions</h4>

				<div className="actions">
					<button>Block</button>
					<button>Send Message</button>
				</div>
			</div>
		</div>
	);
};

export default PublicProfileSidebar;
