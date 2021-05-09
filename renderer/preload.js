const {contextBridge, ipcRenderer} = require('electron');

const constants = require('../common/constants');

contextBridge.exposeInMainWorld('electron', {
  SUCCESS: constants.STATUS_SUCCESS,
  KEY_STORAGE: constants.LOCAL_STORAGE_KEY_ITEMS,

  sendAddItem: itemUrl =>
      ipcRenderer.send(constants.IPC_SEND_ADD_ITEM, itemUrl),

  replyAddItem: callback =>
      ipcRenderer.on(constants.IPC_REPLY_ADD_ITEM, (e, newItem) => {
        callback(newItem);
      })
});
