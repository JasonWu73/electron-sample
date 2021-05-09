import items from './items.js';

const loadingClassName = 'btn--loading';

const searchInput = document.querySelector(
    '.bookmarking__header__search');
const showModalBtn = document.querySelector(
    '.bookmarking__header__add');
const hideModalBtn = document.querySelector(
    '.bookmarking__modal__cancel');
const modalElement = document.querySelector(
    '.bookmarking__modal');
const addItemBtn = document.querySelector(
    '.bookmarking__modal__add');
const itemUrlInput = document.querySelector(
    '.bookmarking__modal__url');

const handleShowModal = function () {
  showModalBtn.addEventListener('click', () => {
    modalElement.style.display = 'flex';
    itemUrlInput.focus();
  });
};

const handleHideModal = function () {
  hideModalBtn.addEventListener('click', () => {
    modalElement.style.display = 'none';
  });
};

const handleAddItem = function () {
  const isAddItemButtonDisabled = () =>
      addItemBtn.classList.contains(loadingClassName);

  const toggleModalButtons = () => {
    if (isAddItemButtonDisabled()) {
      addItemBtn.innerText = '添加';
      addItemBtn.classList.remove(loadingClassName);
      hideModalBtn.style.display = 'inline';
    } else {
      addItemBtn.innerText = '添加中...';
      addItemBtn.classList.add(loadingClassName);
      hideModalBtn.style.display = 'none';
    }
  };

  addItemBtn.addEventListener('click', () => {
    if (itemUrlInput.value) {
      window.electron.addItemWaiting(itemUrlInput.value);

      toggleModalButtons();
    }
  });

  itemUrlInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && !isAddItemButtonDisabled()) {
      addItemBtn.click();
    }
  });

  const hideAndClear = () => {
    modalElement.style.display = 'none';
    itemUrlInput.value = '';
  };

  window.electron.answerAddItem(({status, title, screenshot, url}) => {
    if (status === window.electron.SUCCESS) {
      items.addItem({title, screenshot, url}, false);
      hideAndClear();
    }

    toggleModalButtons();
  });
};

const handleSearch = function () {
  searchInput.addEventListener('keyup', () => {
    Array.from(document.querySelectorAll('.bookmarking__content__item'))
    .forEach(itemNode => {

      const hasMatch = itemNode.innerText.toLowerCase()
      .includes(searchInput.value.toLowerCase());

      itemNode.style.display = hasMatch ? 'flex' : 'none';
    });
  });
};

const handleArrowUpArrowDownKey = function () {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      items.changeSelection(e.key);
    } else if (e.key === 'Enter') {
      if (e.target !== searchInput) {
        items.getSelectedItem()
        .dispatchEvent(new MouseEvent('dblclick'));
      }
    }
  });
};

const main = function () {
  handleShowModal();
  handleHideModal();
  handleAddItem();
  handleSearch();
  handleArrowUpArrowDownKey();
};

main();
