const {
	app,
	BrowserWindow,
	Menu,
	Tray,
	ipcMain,
	Notification
} = require('electron');
const path = require('path');
const url = require('url');
const notifier = require('node-notifier');

const { getDoNotDisturb } = require('electron-notification-state');

const log = require('electron-log');

const iconPath = path.join(__dirname, 'favicon.png');

const { autoUpdater } = require('electron-updater');

require('dotenv').config();

autoUpdater.logger = log;

log.warn('GH_TOKEN', process.env.GH_TOKEN);

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

let appIcon = null;
let focused = false;

function destroy() {
	appIcon.destroy();
}

app.whenReady().then(() => {
	appIcon = new Tray(iconPath);

	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App',
			click: function () {
				mainWindow.show();
			}
		},
		{
			label: 'Quit',
			click: function () {
				app.isQuiting = true;
				destroy();
				app.quit();
			}
		}
	]);
	appIcon.setContextMenu(contextMenu);
	appIcon.setToolTip('Symplee');
});

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1440,
		height: 1080,
		show: false,
		// frame: app.isPackaged ? false : true
		frame: true,
		webPreferences: {
			contextIsolation: true,
			preload: path.resolve(__dirname, 'preload.js')
		}
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
		focused = true;
	});

	mainWindow.on('minimize', function (event) {
		event.preventDefault();
		mainWindow.minimize();
		focused = false;
	});

	mainWindow.on('closed', () => {
		destroy();
	});

	mainWindow.on('focus', function (e) {
		focused = true;
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

ipcMain.on('new-notification', function (e, data) {
	if (!getDoNotDisturb()) {
		if (mainWindow.isFocused() === false) {
			const notif = new Notification({
				title: data.title,
				body: data.body
			});

			notif.show();

			notif.on('click', () => {
				mainWindow.show();
				mainWindow.focus();
			});
		}
	}
});

notifier.on('click', function () {
	app.show();
	mainWindow.show();
});

ipcMain.on('test', (event, arg) => {
	log.info('testtttttttttttttt');
});

// const server = 'https://hazel.symplee.app';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
