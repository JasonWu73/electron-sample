const {ipcMain} = require('electron');

const constants = require('../common/constants');
const askFruit = require('./askFruit');

ipcMain.handle(constants.IPC_ASK_FRUIT, () => {
  return askFruit();
});

ipcMain.on(constants.IPC_SEND_ASK_FRUIT, e => {
  askFruit().then(answer =>
      e.reply(constants.IPC_REPLY_ASK_FRUIT, answer));
  // e.sender.send(constants.IPC_REPLY_ASK_FRUIT, answer));
});
