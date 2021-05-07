# Electron 样板项目

## 官方模板项目

- [electron / electron-quick-start](https://github.com/electron/electron-quick-start)

## 必读文档

- [Docs: Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start)
- [Docs: Application Debugging](https://www.electronjs.org/docs/tutorial/application-debugging)
- [Docs: Debugging the Main Process](https://www.electronjs.org/docs/tutorial/debugging-main-process)
- [Docs: Using Native Node Modules](https://www.electronjs.org/docs/tutorial/using-native-node-modules)

### 主进程 API

- [Docs: app](https://www.electronjs.org/docs/api/app)
- [Docs: BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
- [Docs: webContents](https://www.electronjs.org/docs/api/web-contents)
- [Docs: session](https://www.electronjs.org/docs/api/session)
- [Docs: Class: Cookies](https://www.electronjs.org/docs/api/cookies)
- [Docs: Class: DownloadItem](https://www.electronjs.org/docs/api/download-item)
- [Docs: dialog](https://www.electronjs.org/docs/api/dialog)
- [Docs: powerMonitor](https://www.electronjs.org/docs/api/power-monitor)
- [Docs: screen](https://www.electronjs.org/docs/api/screen)

全局快捷键：

- [Docs: Accelerator](https://www.electronjs.org/docs/api/accelerator)
- [Docs: globalShortcut](https://www.electronjs.org/docs/api/global-shortcut)

菜单（局部快捷键）：

-[Docs: Menu](https://www.electronjs.org/docs/api/menu)
-[Docs: MenuItem](https://www.electronjs.org/docs/api/menu-item)

系统工具栏图标：

- [Docs: Tray](https://www.electronjs.org/docs/api/tray)
- [Docs: nativeImage](https://www.electronjs.org/docs/api/native-image)
    - [Retina Web Graphics Explained: 1x versus 2x (Low‑Res versus Hi‑Res)](https://www.danrodney.com/blog/retina-web-graphics-explained-1x-versus-2x-low-res-versus-hi-res/)

### 渲染器进程 API

- [Docs: Opening windows from the renderer](https://www.electronjs.org/docs/api/window-open)
- [Docs: Class: BrowserWindowProxy](https://www.electronjs.org/docs/api/browser-window-proxy)
- [Docs: webFrame](https://www.electronjs.org/docs/api/web-frame)
- [Docs: desktopCapturer](https://www.electronjs.org/docs/api/desktop-capturer)

### 进程间交互 API

- [Docs: ipcMain](https://www.electronjs.org/docs/api/ipc-main)
- [Docs: ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer)

考虑到安全性及性能，现已不推荐使用的 `remote` 模块：

> 使用 `ipcRenderer.invoke(channel, ...args)` 和 `ipcMain.handle(channel, listener)`（在渲染器线程中调用主线程的方法）可替代 `remote`。

- [Docs: remote](https://www.electronjs.org/docs/api/remote)
    - [Node.js: Globals](https://nodejs.org/api/globals.html)

### 主线程与渲染器进程共享的 API

- [Docs: process](https://www.electronjs.org/docs/api/process)
    - [Node.js: Process](https://nodejs.org/api/process.html)
- [Docs: shell](https://www.electronjs.org/docs/api/shell)
- [Docs: nativeImage](https://www.electronjs.org/docs/api/native-image)
    - [MDN: Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- [Docs: clipboard](https://www.electronjs.org/docs/api/clipboard)

## 项目说明

### 去除 preload 脚本

通过 `nodeIntegration` 及 `contextIsolation` 配置，可去除掉 preload 脚本。

> 从渲染器进程中直接访问 Node.js API，但安全性较差（因为 Node 主进程可直接访问系统中的文件），不建议用于加载非开发者可控的远程资源。

### 页面 CSP

简化 CSP，添加支持内嵌资源（`'unsafe-inline'`）的策略。

- [MDN - Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### 开启 remote 模块

### 项目命令行工具

运行程序：

```bash
npm run start
```

开发模式（自动重启服务）：

```bash
npm run watch
```

打包与发布（自动识别当前平台）：

```bash
npm run package

npm run make
```
