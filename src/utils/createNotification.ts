import appRuntime from '../appRuntime';
export const createNotification = (title: string, body: string) => {
	appRuntime.send('new-notification', { title, body });
};
