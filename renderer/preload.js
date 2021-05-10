const {contextBridge, ipcRenderer} = require('electron');
const fs = require('fs');
const path = require('path');

const constants = require('../common/constants');

contextBridge.exposeInMainWorld('electron', {
  SUCCESS: constants.STATUS_SUCCESS,
  KEY_STORAGE: constants.LOCAL_STORAGE_KEY_ITEMS,

// 从外部文件中读取 JS 代码
  readJs: (filePathRelativePreload, callback) => {
    const filePath = path.join(__dirname, filePathRelativePreload);
    fs.readFile(filePath, 'utf8', (err, buffer) => {
      if (err) {
        throw err;
      }

      callback(buffer.toString());
    });
  },

  sendAddItem: itemUrl =>
      ipcRenderer.send(constants.IPC_SEND_ADD_ITEM, itemUrl),

  replyAddItem: callback =>
      ipcRenderer.on(constants.IPC_REPLY_ADD_ITEM, (e, newItem) => {
        callback(newItem);
      })
});
