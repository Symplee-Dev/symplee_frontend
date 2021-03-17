export const createNotification = (title: string, body: string) => {
	new Notification(title, {
		body: body
	});
};
