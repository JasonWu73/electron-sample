const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

const updater = require('./main/updater');
require('./main/ipc');
const {ApplicationMenu} = require('./main/menu');
const ApplicationTray = require('./main/tray');

// 离屏渲染：禁用 GPU 渲染，改用软件渲染，效率更高
app.disableHardwareAcceleration();

// 将引用放于此处，防止被 Electron 垃圾回收
let tray;

function createWindow() {
  // 检查更新
  // setTimeout(updater, 3000);

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

  // 创建应用菜单
  new ApplicationMenu(mainWindow);

  mainWindow.loadFile('renderer/main.html');

  // 开发者工具，发布时记录注释掉
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  // 系统托盘
  tray = new ApplicationTray(createWindow).tray;

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', e => {
  // 只能通过托盘进行关闭
  e.preventDefault();
});
