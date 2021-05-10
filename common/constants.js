module.exports = Object.freeze({
  STATUS_SUCCESS: 'success',
  STATUS_FAIL: 'fail',

  LOCAL_STORAGE_KEY_ITEMS: 'bookmarking-items',

  WINDOW_MESSAGE_SIGNAL_REMOVE_ITEM: 'remove-item',

  IPC_CHANNEL_SEND_ADD_ITEM: 'add-item-send',
  IPC_CHANNEL_REPLY_ADD_ITEM: 'add-item-reply',

  IPC_CHANNEL_SHOW_MODAL: 'menu-show-modal',
  IPC_CHANNEL_OPEN_ITEM: 'menu-open-item',
  IPC_CHANNEL_DELETE_ITEM: 'menu-delete-item',
  IPC_CHANNEL_OPEN_ITEM_NATIVE: 'menu-open-item-native',
  IPC_CHANNEL_FOCUS_SEARCH: 'menu-focus-search'
});
