import './style.scss';

const Discover = () => {
	return (
		<div className="discover">
			<h3>Discover Groups</h3>
			<form>
				<input type="text" required placeholder="The Boys Group" />
				<button>Search</button>
			</form>
		</div>
	);
};

export default Discover;
