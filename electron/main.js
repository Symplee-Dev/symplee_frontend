const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const log = require('electron-log');

const { autoUpdater } = require('electron-updater');

require('dotenv').config();

autoUpdater.logger = log;

log.warn('GH_TOKEN', process.env.GH_TOKEN);

autoUpdater.setFeedURL({
	provider: 'github',
	repo: 'symplee_frontend',
	owner: 'Symplee-Dev',
	private: true,
	token: process.env.GH_TOKEN
});

log.info('starting app...');

autoUpdater.on('checking-for-update', () => {
	log.info('Checking for update...');
});

autoUpdater.on('update-available', info => {
	log.info('Update available...');
});

autoUpdater.on('update-not-available', info => {
	log.info('Update not available.');
});
autoUpdater.on('error', err => {
	log.error('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', progressObj => {
	let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message =
		log_message +
		' (' +
		progressObj.transferred +
		'/' +
		progressObj.total +
		')';
	log.info(log_message);
});

autoUpdater.on('update-downloaded', info => {
	log.info('Update downloaded');
});

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 600,
		height: 600,
		show: false,
		// frame: app.isPackaged ? false : true
		frame: true
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

app.on('ready', async () => {
	await autoUpdater.checkForUpdatesAndNotify();
	createWindow();
});

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

// const server = 'https://hazel.symplee.app';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
