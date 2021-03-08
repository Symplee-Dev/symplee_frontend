import { Maybe } from '../../../../graphql';
const Notification = ({
	notif
}: {
	notif: Maybe<{
		description: string;
		type?: Maybe<string>;
		createdAt: string;
		read: boolean;
		from?: Maybe<{
			username: string;
			key: string;
		}>;
	}>;
}) => {
	return <div className="notification">{notif?.description}</div>;
};

export default Notification;
