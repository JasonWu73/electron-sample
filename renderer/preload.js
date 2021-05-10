const {contextBridge, ipcRenderer, shell} = require('electron');
const fs = require('fs');
const path = require('path');

const constants = require('../common/constants');

contextBridge.exposeInMainWorld('electron', {
  SUCCESS: constants.STATUS_SUCCESS,
  KEY_STORAGE: constants.LOCAL_STORAGE_KEY_ITEMS,

  REMOVE_ITEM: constants.WINDOW_MESSAGE_SIGNAL_REMOVE_ITEM,

  openNative: url => shell.openExternal(url),

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

  // 监听由子窗口发送来的消息
  listenSubWindowMessage: callback => {
    window.addEventListener('message', e => {
      callback(e);
    });
  },

  sendAddItem: itemUrl =>
      ipcRenderer.send(constants.IPC_CHANNEL_SEND_ADD_ITEM, itemUrl),

  replyAddItem: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_REPLY_ADD_ITEM,
          (e, newItem) => callback(newItem)),

  receivedOpenModal: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_SHOW_MODAL, callback),

  receivedOpenItem: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_OPEN_ITEM, callback),

  receivedDeleteItem: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_DELETE_ITEM, callback),

  receivedOpenItemNative: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_OPEN_ITEM_NATIVE, callback),

  receivedFocusOnSearch: callback =>
      ipcRenderer.on(constants.IPC_CHANNEL_FOCUS_SEARCH, callback)
});
