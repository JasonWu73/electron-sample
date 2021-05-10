const itemsElement = document.querySelector(
    '.bookmarking__content__items');
const contentElement = document.querySelector(
    '.bookmarking__content');

const storage = JSON.parse(
    localStorage.getItem(window.electron.KEY_STORAGE)) || [];

const save = function () {
  localStorage.setItem(window.electron.KEY_STORAGE,
      JSON.stringify(storage));
};

const getSelectedItem = function () {
  return document.querySelector('.bookmarking__content__item.selected');
};

const select = function (e) {
  getSelectedItem().classList.remove('selected');

  e.currentTarget.classList.add('selected');
};

const addItem = (item, initial) => {
  const itemElement = document.createElement('div');
  itemElement.setAttribute('class', 'bookmarking__content__item');
  itemElement.innerHTML =
      `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  itemElement.setAttribute('data-url', item.url);

  itemsElement.appendChild(itemElement);

  itemElement.addEventListener('click', select);

  // 默认选中第一项
  if (document.querySelectorAll(
      '.bookmarking__content__item').length === 1) {
    itemElement.classList.add('selected');
  }

  itemElement.addEventListener('dblclick', open);

  if (!initial) {
    storage.push(item);
    save();
  }
};

const changeSelection = function (direction) {
  let currentItem = getSelectedItem();

  if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
    currentItem.classList.remove('selected');
    currentItem.previousElementSibling.classList.add('selected');
  } else if (
      direction === 'ArrowDown' && currentItem.nextElementSibling) {
    currentItem.classList.remove('selected');
    currentItem.nextElementSibling.classList.add('selected');
  }

  // Scroll to element
  currentItem = getSelectedItem();
  contentElement.scrollTop = currentItem.offsetTop;
};

const open = function () {
  const currentItem = getSelectedItem();
  const contentUrl = currentItem.dataset.url;

  const readerWindowProxy = window.open(contentUrl, '', `
    width: 1200,
    height: 800,
    maxWidth=2000,
    maxHeight=2000,
    backgroundColor=#dedede
  `);

  window.electron.readJs('./reader.js', jsCode => {
    readerWindowProxy.eval(jsCode);
  });
};

const initItems = function () {
  storage.forEach(item => addItem(item, true));
};

const getItemIndex = currentItem => {
  let itemIndex = 0;
  let child = currentItem;
  while ((child = child.previousElementSibling) !== null) {
    ++itemIndex;
  }
  return itemIndex;
};

const remove = function () {
  // 获取删除节点及其在父元素中的索引
  const currentItem = getSelectedItem();
  const currentItemIndex = getItemIndex(currentItem);

  // 删除 DOM 节点
  itemsElement.removeChild(currentItem);

  // 删除数据
  storage.splice(currentItemIndex, 1);
  save();

  // 选中上一个兄弟节点
  // 有上一个兄弟节点：选中该节点
  // 没有上一个兄弟节点：选中第一个节点
  if (storage.length) {
    const newSelectedItemIndex =
        currentItemIndex === 0 ? 0 : currentItemIndex - 1;

    document.querySelectorAll(
        '.bookmarking__content__item')[newSelectedItemIndex]
    .classList.add('selected');
  }
};

const main = function () {
  initItems();

  window.electron.listenSubWindowMessage(event => {
    // 监听由子窗口发送来的"移除"消息
    if (event.data.signal === window.electron.REMOVE_ITEM) {
      remove();
      event.source.close();
    }
  });
};

main();

export default {
  addItem,
  getSelectedItem,
  changeSelection
};
