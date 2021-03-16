const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 600,
		show: false,
		frame: process.env.NODE_ENV === 'production' ? false : true
	});
	mainWindow.loadURL(
		!app.isPackaged
			? process.env.ELECTRON_START_URL
			: url.format({
					pathname: path.join(__dirname, '../index.html'),
					protocol: 'file:',
					slashes: true
			  })
	);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		if (process.env.NODE_ENV === 'production') {
			const server = 'https://hazel.symplee.app';
			const feed = `${server}/update/${
				process.platform
			}/${app.getVersion()}`;

			autoUpdater.setFeedURL(feed);
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
