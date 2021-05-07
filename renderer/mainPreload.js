// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
  versions: {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron
  },

  askFruitAsync: () => {
    // ipcRenderer.send('ask-fruit');
    //
    // ipcRenderer.on('answer-fruit', (e, answer) => {
    //    console.log(answer);
    // });
    return ipcRenderer.invoke('ask-fruit');
  }
});
