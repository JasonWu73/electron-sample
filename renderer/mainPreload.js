// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  const {ipcRenderer} = require('electron');

  const askButton = document.getElementById('ask');

  const renderElectronVersionSection = function () {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) {
        element.innerText = text;
      }
    };

    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type]);
    }
  };

  const handleAskButtonClick = function () {
    askButton.addEventListener('click', () => {
      ipcRenderer.invoke('ask-fruit').then(answer => {
        console.log(answer);
      });
      // ipcRenderer.send('ask-fruit');

      // ipcRenderer.on('answer-fruit', (e, answer) => {
      //   console.log(answer);
      // });
    });
  };

  const main = function () {
    renderElectronVersionSection();
    handleAskButtonClick();
  };

  main();
});
