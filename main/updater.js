const {dialog} = require('electron');
const {autoUpdater} = require('electron-updater');

// Debugging
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

module.exports = () => {
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', () => {

    dialog.showMessageBox({
      type: 'info',
      title: '发现新版本',
      message: '发现可用的新版本，您想要现在就更新吗？',
      buttons: ['更新', '下次再说']
    }).then(result => {
      const buttonIndex = result.response;

      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '您打算现在就安装新版本并重启吗？',
      buttons: ['安装', '稍后再说']
    }).then(result => {
      const buttonIndex = result.response;

      if (buttonIndex === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
  });
};
