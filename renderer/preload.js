const {contextBridge, ipcRenderer} = require('electron');
const constants = require('../common/constants');

contextBridge.exposeInMainWorld('electron', {
  addItemWaiting: itemUrl =>
      ipcRenderer.send(constants.IPC_ADD_ITEM, itemUrl),
  answerAddItem: callback =>
      ipcRenderer.on(constants.IPC_ANSWER_ADD_ITEM, (e, newItem) => {
        callback(newItem);
      })
});
