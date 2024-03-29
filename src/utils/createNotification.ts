import appRuntime from '../appRuntime';

export function isElectron() {
	// Renderer process
	if (
		typeof window !== 'undefined' &&
		typeof window.process === 'object' &&
		//@ts-ignore
		window.process.type === 'renderer'
	) {
		return true;
	}

	// Main process
	if (
		typeof process !== 'undefined' &&
		typeof process.versions === 'object' &&
		//@ts-ignore
		!!process.versions.electron
	) {
		return true;
	}

	// Detect the user agent when the `nodeIntegration` option is set to true
	if (
		typeof navigator === 'object' &&
		typeof navigator.userAgent === 'string' &&
		navigator.userAgent.indexOf('Electron') >= 0
	) {
		return true;
	}

	return false;
}

export const createNotification = (title: string, body: string) => {
	if (isElectron()) {
		appRuntime.send('new-notification', { title, body });
	}
};
