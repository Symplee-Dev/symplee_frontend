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

	mainWindow.on('close', function (event) {
		event.preventDefault();
		mainWindow.hide();
	});

	mainWindow.on('minimize', function (event) {
		event.preventDefault();
		mainWindow.hide();
	});

	mainWindow.on('closed', () => {
		destroy();
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

ipcMain.on('new-notification', data => {
	if (!getDoNotDisturb()) {
		const notif = new Notification({ title: data.title, body: data.body });

		notif.addListener('click', () => app.show());
	}
});

// const server = 'https://hazel.symplee.app';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
