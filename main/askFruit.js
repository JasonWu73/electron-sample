const {dialog} = require('electron');

async function askFruit() {
  const fruits = ['Apple', 'Orange', 'Grape'];

  const choice = await dialog.showMessageBox({
    message: 'Pick a fruit:',
    buttons: fruits
  });

  return fruits[choice.response];
}

module.exports = askFruit;
