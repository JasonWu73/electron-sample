// This file is required by the secondary.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.button');

  button.addEventListener('click', () => {
    alert('Sorry! I don\'t Know how to open window in renderer process :(');
  });
});
