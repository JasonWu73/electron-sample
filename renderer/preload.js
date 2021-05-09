// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {contextBridge, ipcRenderer} = require('electron');

const constants = require('../common/constants')

contextBridge.exposeInMainWorld('electron', {
  versions: {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron
  },

  askFruit: () => ipcRenderer.invoke(constants.IPC_ASK_FRUIT),

  sendAskFruit: () => ipcRenderer.send(constants.IPC_SEND_ASK_FRUIT),

  replyFruit: (callback) => {
    ipcRenderer.on(constants.IPC_REPLY_ASK_FRUIT, (e, answer) => {
      callback(answer);
    });
  }
});
