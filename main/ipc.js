const {ipcMain} = require('electron');

const constants = require('../common/constants');
const readItem = require('./readItem');

ipcMain.on(constants.IPC_ADD_ITEM, (e, itemUrl) => {
  readItem(itemUrl, newItem =>
      // e.sender.send(constants.IPC_REPLY_ADD_ITEM, newItem));
      e.reply(constants.IPC_REPLY_ADD_ITEM, newItem));
});
