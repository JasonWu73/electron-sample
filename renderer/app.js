const loadingClassName = 'btn--loading';

const showModalBtn = document.querySelector('.bookmarking__header__add');
const hideModalBtn = document.querySelector('.bookmarking__modal__cancel');
const modal = document.querySelector('.bookmarking__modal');
const addItemBtn = document.querySelector('.bookmarking__modal__add');
const itemUrl = document.querySelector('.bookmarking__modal__url');

const handleShowModal = function () {
  showModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    itemUrl.focus();
  });
};

const handleHideModal = function () {
  hideModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
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
    if (itemUrl.value) {
      window.electron.addItemWaiting(itemUrl.value);

      toggleModalButtons();
    }
  });

  itemUrl.addEventListener('keyup', e => {
    if (e.key === 'Enter' && !isAddItemButtonDisabled()) {
      addItemBtn.click();
    }
  });

  const hideAndClear = () => {
    modal.style.display = 'none';
    itemUrl.value = '';
  };

  window.electron.answerAddItem((newItem) => {
    console.log(newItem);

    toggleModalButtons();
    hideAndClear();
  });
};

const main = function () {
  handleShowModal();
  handleHideModal();
  handleAddItem();
};

main();
