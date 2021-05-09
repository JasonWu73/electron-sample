const {BrowserWindow, dialog} = require('electron');

const constants = require('../common/constants');

const readItem = function (url, callback) {
  const offscreenWindow = new BrowserWindow({
    // Offscreen window 取页面快照（缩略图）时会使用该尺寸
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  offscreenWindow.loadURL(url).catch(() => {
    dialog.showErrorBox('页面加载失败',
        `无法打开网址 ${url}，请检查网址是否正确或当前网络是否可用`);

    callback({
      status: constants.STATUS_FAIL,
      title: '页面加载失败',
      screenshot: null,
      url
    });
  });

  // 只要是进行了页面加载，不论成功与否都会触发 `did-finish-load` 事件
  offscreenWindow.webContents.on('did-finish-load', () => {
    const pageTitle = offscreenWindow.getTitle();

    // 获取页面快照（缩略图）
    offscreenWindow.webContents.capturePage().then(image => {
      const screenshot = image.toDataURL();

      if (!image.isEmpty()) {
        callback({
          status: constants.STATUS_SUCCESS,
          title: pageTitle,
          screenshot,
          url
        });
      }

      // 清理
      offscreenWindow.close();
    });
  });
};

module.exports = readItem;
