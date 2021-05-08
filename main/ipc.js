const {ipcMain} = require('electron');

const constants = require('../common/constants');

ipcMain.on(constants.IPC_ADD_ITEM, (e, itemUrl) => {
  setTimeout(() => {
    e.sender.send(constants.IPC_ANSWER_ADD_ITEM,
        `主进程处理 ${itemUrl}`);
  }, 2000);
  console.log(itemUrl);
});
