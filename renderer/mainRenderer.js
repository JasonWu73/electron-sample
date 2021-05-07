// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const askButton = document.getElementById('ask');

const renderVersions = function () {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, window.electron.versions[type]);
  }
};

const handleAskClick = function () {
  askButton.addEventListener('click', () => {
    window.electron.askFruitAsync().then(answer => console.log(answer));
  });
};

const main = function () {
  renderVersions();
  handleAskClick();
};

main();
