const {ipcMain, dialog} = require('electron');

async function askFruit() {

  const fruits = ['Apple', 'Orange', 'Grape'];

  const choice = await dialog.showMessageBox({
    message: 'Pick a fruit:',
    buttons: fruits
  });

  return fruits[choice.response];
}

module.exports = {
  ipcAskFruit: () => {
    ipcMain.handle('ask-fruit', () => {
      return askFruit();
    });
  },
  ipcAskAnswerFruit: () => {
    ipcMain.on('ask-fruit-on', e => {
      askFruit().then(answer => e.reply('answer-fruit-on', answer));
    });
  }
};
