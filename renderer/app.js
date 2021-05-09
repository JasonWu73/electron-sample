// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const askInvokeBtn = document.querySelector(
    '.sample__buttons__ask-invoke');
const askSendBtn = document.querySelector(
    '.sample__buttons__ask-send');

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

const handleInvokeAsk = function () {
  askInvokeBtn.addEventListener('click', () => {
    window.electron.askFruit()
    .then(answer => console.log(`invoke: ${answer}`));
  });
};

const handleSendReplyAsk = function () {
  askSendBtn.addEventListener('click', () => {
    window.electron.sendAskFruit();
  });

  window.electron.replyFruit(answer =>
      console.log(`reply or send: ${answer}`));
};

const main = function () {
  renderVersions();
  handleInvokeAsk();
  handleSendReplyAsk();
};

main();
