const {app, Menu, shell} = require('electron');

const constants = require('../common/constants');

class MyMenu {
  isMac = process.platform === 'darwin';

  createMenu(template = []) {
    return Menu.buildFromTemplate(template);
  }
}

class ApplicationMenu extends MyMenu {
  mainWindow;

  constructor(mainWindow) {
    super();
    this.mainWindow = mainWindow;

    this._createMenu();
  }

  _getTemplate() {
    return [
      // { role: 'appMenu' }
      ...(this.isMac ? [{
        label: app.name,
        submenu: [
          {label: `关于 ${app.name}`, role: 'about'},
          {type: 'separator'},
          {label: '服务', role: 'services'},
          {type: 'separator'},
          {label: `隐藏 ${app.name}`, role: 'hide'},
          {label: '隐藏其他应用', role: 'hideothers'},
          {label: '显示全部', role: 'unhide'},
          {type: 'separator'},
          {label: `退出 ${app.name}`, role: 'quit'}
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: '文件',
        submenu: [
          {
            label: '添加网址',
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              this.mainWindow.webContents
              .send(constants.IPC_CHANNEL_SHOW_MODAL);
            }
          },
          {
            label: '打开网址',
            accelerator: 'CmdOrCtrl+Enter',
            click: () => {
              this.mainWindow.webContents
              .send(constants.IPC_CHANNEL_OPEN_ITEM);
            }
          },
          {
            label: '从浏览器中打开网址',
            accelerator: 'CmdOrCtrl+Shift+Enter',
            click: () => {
              this.mainWindow.webContents
              .send(constants.IPC_CHANNEL_OPEN_ITEM_NATIVE);
            }
          },
          {
            label: '删除网址',
            accelerator: 'CmdOrCtrl+Backspace',
            click: () => {
              this.mainWindow.webContents
              .send(constants.IPC_CHANNEL_DELETE_ITEM);
            }
          },
          {type: 'separator'},
          {
            label: '搜索',
            accelerator: 'CmdOrCtrl+F',
            click: () => {
              this.mainWindow.webContents
              .send(constants.IPC_CHANNEL_FOCUS_SEARCH);
            }
          },
          {type: 'separator'},
          this.isMac ?
              {label: '关闭窗口', role: 'close'} :
              {label: '退出应用', role: 'quit'}
        ]
      },
      // {role: 'editMenu'}
      {
        label: '编辑',
        submenu: [
          {label: '撤销', role: 'undo'},
          {label: '重做', role: 'redo'},
          {type: 'separator'},
          {label: '剪切', role: 'cut'},
          {label: '复制', role: 'copy'},
          {label: '粘贴', role: 'paste'},
          {label: '删除', role: 'delete'},
          {type: 'separator'},
          {label: '全选', role: 'selectAll'}
        ]

      },
      // {role: 'viewMenu'}
      {
        label: '视图',
        submenu: [
          {label: '切换全屏', role: 'togglefullscreen'}
        ]
      },
      // {role: 'windowMenu'}
      {
        label: '窗口',
        submenu: [
          {label: '最小化', role: 'minimize'},
          {label: '缩放', role: 'zoom'},
          ...(this.isMac ? [
            {type: 'separator'},
            {label: '前置全部窗口', role: 'front'}
          ] : [
            {label: '关闭', role: 'close'}
          ])
        ]
      },
      {
        label: '帮助',
        role: 'help',
        submenu: [{
          label: '使用帮助',
          click: () => {
            shell.openExternal(
                'https://github.com/JasonWu73/electron-sample/tree/bookmarking');
          }
        }]
      }
    ];
  }

  _createMenu() {
    const template = this._getTemplate();
    const builtMenu = super.createMenu(template);

    // 设置为应用目录
    Menu.setApplicationMenu(builtMenu);
  }
}

class ContextMenu extends MyMenu {
  constructor() {
    super();
  }
}

module.exports = {
  ApplicationMenu,
  ContextMenu
};
