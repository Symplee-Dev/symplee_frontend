import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
export const Footer = () => {
	const history = useHistory();

	return (
		<div className="footer">
			<div className="left">
				<FontAwesomeIcon icon={faInbox} onClick={e => history.push('/')} />
				<p>Symplee</p>
			</div>
			<div className="copyright">Symplee 2021</div>
			<div className="right">
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="__blank">
					Having Issues?
				</a>
				<a
					target="__blank"
					href="https://www.privacypolicies.com/live/47f9aa43-268f-4b7a-8b81-c0b4a0845d75"
				>
					Privacy Policy
				</a>
			</div>
		</div>
	);
};
