// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
  versions: {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron
  },

  askFruit: () => ipcRenderer.invoke('ask-fruit'),

  askFruitWaiting: () => ipcRenderer.send('ask-fruit-on'),

  answerFruit: (callback) => {
    ipcRenderer.on('answer-fruit-on', (e, answer) => {
      callback(answer);
    });
  }
});
