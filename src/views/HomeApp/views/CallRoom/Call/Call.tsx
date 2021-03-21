import './style.scss';
import CallBar from '../CallBar/CallBar';
import CallUser from '../CallUser/CallUser';

const Call = () => {
	return (
		<div className="call-room">
			<CallBar />
			<div className="call-members">
				<CallUser id="1" />
				<CallUser id="1" />
				<CallUser id="1" />
				<CallUser id="1" />
				<CallUser id="1" />
			</div>
		</div>
	);
};

export default Call;
