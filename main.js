// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

const {ipcAskFruit, ipcAskAnswerFruit} = require('./main/dialog');

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 550,
    minHeight: 350,
    webPreferences: {
      preload: path.join(__dirname, 'renderer/mainPreload.js')
    },
    // Showing window gracefully (use a color close to app's background)
    backgroundColor: '#2B2E3B'
  });

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

ipcAskFruit();
ipcAskAnswerFruit()
