// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const {ipcRenderer} = require('electron');

  document.getElementById('ask').addEventListener('click', e => {
    // ipcRenderer.send('ask-fruit');

    ipcRenderer.invoke('ask-fruit')
    .then(answer => {
      console.log(answer);
    });
  });

  // ipcRenderer.on('answer-fruit', (e, answer) => {
  //   console.log(answer);
  // });
});
