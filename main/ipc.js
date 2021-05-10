const {ipcMain} = require('electron');

const constants = require('../common/constants');
const readItem = require('./readItem');

ipcMain.on(constants.IPC_CHANNEL_SEND_ADD_ITEM, (e, itemUrl) => {
  readItem(itemUrl, newItem =>
      // e.sender.send(constants.IPC_CHANNEL_ADD_ITEM_REPLY, newItem));
      e.reply(constants.IPC_CHANNEL_REPLY_ADD_ITEM, newItem));
});
