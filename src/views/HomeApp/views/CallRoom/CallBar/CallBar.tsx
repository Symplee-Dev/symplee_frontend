import './style.scss';
import { UISelectors } from '../../../../../redux/selectors';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import MicOffSharpIcon from '@material-ui/icons/MicOffSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';
import VideocamOffSharpIcon from '@material-ui/icons/VideocamOffSharp';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';

const CallBar = () => {
	const currentChat = UISelectors.useSelectCurrentChat()!;
	const history = useHistory();

	if (!currentChat) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="call-bar">
			<div className="left">
				<h5>#{currentChat.name}</h5>
				<p>2 members in the call</p>
			</div>
			<div className="middle">
				<button onClick={() => history.goBack()}>
					Leave <ExitToAppSharpIcon />
				</button>
			</div>
			<div className="right">
				<MicSharpIcon />
				<VideocamSharpIcon />
			</div>
		</div>
	);
};

export default CallBar;
