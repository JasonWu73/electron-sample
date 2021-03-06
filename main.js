// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

require('./main/ipc');

// 离屏渲染：禁用 GPU 渲染，改用软件渲染，效率更高
app.disableHardwareAcceleration();

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // electron-window-state: 1
  const mainWindowState = windowStateKeeper({
    defaultWidth: 420,
    defaultHeight: 240
  });

  // electron-window-state: 2
  // Create the browser window
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 420,
    maxWidth: 420,
    minHeight: 240,
    webPreferences: {
      preload: path.join(__dirname, 'renderer/preload.js')
    },
    // Showing window gracefully (use a color close to app's background)
    backgroundColor: '#2B2E3B'
  });
 
  // electron-window-state: 3
  mainWindowState.manage(mainWindow);

  // Load HTML into the BrowserWindow
  mainWindow.loadFile('renderer/main.html');

  // Open DevTools - Remove for PRODUCTION!
  const openDevTools = windows =>
      windows.forEach(window => window.webContents.openDevTools());

  openDevTools([mainWindow]);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
