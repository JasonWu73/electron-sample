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
      window.electron.sendAddItem(itemUrlInput.value);

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

  window.electron.replyAddItem(({status, title, screenshot, url}) => {
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
  const canDoKeyboardAction = obj => {
    const isHiddenModal = !modalElement.style.display ||
        modalElement.style.display === 'none';

    return obj === document.body && isHiddenModal;
  };

  document.addEventListener('keydown', e => {
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
        canDoKeyboardAction(e.target)) {
      items.changeSelection(e.key);
    }
  });
};

const openModalFromMenu = () => {
  window.electron.receivedOpenModal(() => {
    showModalBtn.click();
  });
};

const openItemFromMenu = () => {
  window.electron.receivedOpenItem(() => {
    items.open();
  });
};

const deleteItemFromMenu = () => {
  window.electron.receivedDeleteItem(() => {
    items.remove();
  });
};

const openItemNativeFromMenu = () => {
  window.electron.receivedOpenItemNative(() => {
    items.openNative();
  });
};

const focusOnSearch = () => {
  window.electron.receivedFocusOnSearch(() => {
    searchInput.focus();
  });
};

const main = function () {
  handleShowModal();
  handleHideModal();
  handleAddItem();
  handleSearch();
  handleArrowUpArrowDownKey();
  openModalFromMenu();
  openItemFromMenu();
  deleteItemFromMenu();
  openItemNativeFromMenu();
  focusOnSearch();
};

main();
