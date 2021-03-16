const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 600,
		show: false,
		frame: app.isPackaged ? false : true
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

if (app.isPackaged) {
	const server = 'https://hazel.symplee.app';
	const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

	autoUpdater.setFeedURL(feed);

	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, 60000);
}

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail:
			'A new version has been downloaded. Restart the application to apply the updates.'
	};

	dialog.showMessageBox(dialogOpts).then(returnValue => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall();
	});
});

autoUpdater.on('error', message => {
	console.error('There was a problem updating the application');
	console.error(message);
});
