import { Drawer } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const CreateChatSidebar = ({
	open,
	setOpen
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Drawer variant="persistent" anchor="right" open={open}>
			<div className="drawer">
				<div className="top">
					<FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} />
				</div>
				<div className="content">
					<div className="content-top">
						<h4>Create A Channel</h4>
						<p className="desc">
							Here you can create a new chat channel. These can be a scheduled
							call or chat, or a regular text channel or voice and video
							channel.
						</p>
					</div>
				</div>
			</div>
		</Drawer>
	);
};

export default CreateChatSidebar;
