import SkeletonScreen from './SkeletonScreen';
const HomeInfo = () => {
	return (
		<div className="home-info" id="home-info">
			<div className="container">
				<div className="left">
					<div>
						<h5>HOW DOES IT WORK?</h5>
						<h2>A Place For All Types Of Communication.</h2>
					</div>

					<div className="features">
						<div className="feature">
							<h3>Talk</h3>
							<p>
								Communicate with your friends or teams in real
								time with Symplee voice and video.
							</p>
						</div>
						<div className="feature">
							<h3>Chat</h3>
							<p>
								Create groups, teams, and communities to talk
								with in real time with Symplee text channels.
							</p>
						</div>
						<div className="feature">
							<h3>Collaborate</h3>
							<p>
								Collaborate with your friends or teams using a
								marketplace of integrations like Trello, GitHub,
								and more.
							</p>
						</div>
					</div>
				</div>
				<div className="right">
					<SkeletonScreen />
				</div>
			</div>
		</div>
	);
};

export default HomeInfo;
