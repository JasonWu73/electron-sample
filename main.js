const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

require('./main/ipc');

function createWindow() {
  // electron-window-state: 1
  const mainWindowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  });

  // electron-window-state: 2
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      preload: path.join(__dirname, 'renderer/preload.js')
    }
  });

  // electron-window-state: 3
  mainWindowState.manage(mainWindow);

  mainWindow.loadFile('renderer/main.html');

  const openDevTools = windows =>
      windows.forEach(window => window.webContents.openDevTools());

  openDevTools([mainWindow]);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
