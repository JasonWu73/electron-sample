const {contextBridge, ipcRenderer} = require('electron');

const constants = require('../common/constants');

contextBridge.exposeInMainWorld('electron', {
  SUCCESS: constants.STATUS_SUCCESS,
  KEY_STORAGE: constants.LOCAL_STORAGE_KEY_ITEMS,

  addItemWaiting: itemUrl =>
      ipcRenderer.send(constants.IPC_ADD_ITEM, itemUrl),

  answerAddItem: callback =>
      ipcRenderer.on(constants.IPC_REPLY_ADD_ITEM, (e, newItem) => {
        callback(newItem);
      })
});
