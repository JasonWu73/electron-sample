const electron = require('electron');
const {app, BrowserWindow, Tray, Menu} = electron;
const nativeImage = electron.nativeImage;
const path = require('path');

class ApplicationTray {
  _icon;
  _createWindow;
  tray;

  constructor(createWindow) {
    this._createWindow = createWindow;

    this._setIconBaseOnOs();
    this._createTray();
    this._handleClick();
    this._handleRightClick();
  }

  _setIconBaseOnOs() {
    this._icon = nativeImage.createFromPath(
        path.join(__dirname, '../build/tray@2x.png'));
  }

  _createTray() {
    this.tray = new Tray(this._icon);
    this.tray.setToolTip('网址收藏夹');
  };

  _showAllOpenedWindows() {
    const allOpenedWindows = BrowserWindow.getAllWindows();
    if (allOpenedWindows.length === 0) {
      this._createWindow();
    } else {
      allOpenedWindows.forEach(window => {
        window.show();
      });
    }
  }

  _handleClick() {
    this.tray.on('click', () => {
      this._showAllOpenedWindows();
    });
  }

  _handleRightClick() {
    const contextMenu = Menu.buildFromTemplate([
      {label: `打开${app.getName()}`, click: this._showAllOpenedWindows},
      {type: 'separator'},
      {label: `退出${app.getName()}`, role: 'quit'}
    ]);

    this.tray.on('right-click', () => {
      this.tray.popUpContextMenu(contextMenu);
    });
  }
}

module.exports = ApplicationTray;
