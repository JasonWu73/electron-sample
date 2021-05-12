# Electron 样板项目

## 官方模板项目

- [GitHub: electron / electron-quick-start](https://github.com/electron/electron-quick-start)

## 必读文档

- [Doc: Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start)
- [Doc: Application Debugging](https://www.electronjs.org/docs/tutorial/application-debugging)
- [Doc: Debugging the Main Process](https://www.electronjs.org/docs/tutorial/debugging-main-process)
- [Doc: Using Native Node Modules](https://www.electronjs.org/docs/tutorial/using-native-node-modules)

### 主进程 API

- [Doc: app](https://www.electronjs.org/docs/api/app)
- [Doc: BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
- [Doc: webContents](https://www.electronjs.org/docs/api/web-contents)
- [Doc: session](https://www.electronjs.org/docs/api/session)
- [Doc: Class: Cookies](https://www.electronjs.org/docs/api/cookies)
- [Doc: Class: DownloadItem](https://www.electronjs.org/docs/api/download-item)
- [Doc: dialog](https://www.electronjs.org/docs/api/dialog)
- [Doc: powerMonitor](https://www.electronjs.org/docs/api/power-monitor)
- [Doc: screen](https://www.electronjs.org/docs/api/screen)

全局快捷键：

- [Doc: Accelerator](https://www.electronjs.org/docs/api/accelerator)
- [Doc: globalShortcut](https://www.electronjs.org/docs/api/global-shortcut)

菜单（局部快捷键）：

-[Doc: Menu](https://www.electronjs.org/docs/api/menu)
-[Doc: MenuItem](https://www.electronjs.org/docs/api/menu-item)

系统工具栏图标：

- [Doc: Tray](https://www.electronjs.org/docs/api/tray)
- [Doc: nativeImage](https://www.electronjs.org/docs/api/native-image)
    - [Retina Web Graphics Explained: 1x versus 2x](https://www.danrodney.com/blog/retina-web-graphics-explained-1x-versus-2x-low-res-versus-hi-res/)

### 渲染器进程 API

- [Doc: Opening windows from the renderer](https://www.electronjs.org/docs/api/window-open)
- [Doc: Class: BrowserWindowProxy](https://www.electronjs.org/docs/api/browser-window-proxy)
- [Doc: webFrame](https://www.electronjs.org/docs/api/web-frame)
- [Doc: desktopCapturer](https://www.electronjs.org/docs/api/desktop-capturer)

### 进程间交互 API

- [Doc: ipcMain](https://www.electronjs.org/docs/api/ipc-main)
- [Doc: ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer)

考虑到安全性及性能，现已不推荐使用的 `remote` 模块：

> 使用 `ipcRenderer.invoke(channel, ...args)` 和 `ipcMain.handle(channel, listener)`（在渲染器线程中调用主线程的方法）可替代 `remote`。

- [Doc: remote](https://www.electronjs.org/docs/api/remote)
    - [Node.js: Globals](https://nodejs.org/api/globals.html)

### 主线程与渲染器进程共享的 API

- [Doc: process](https://www.electronjs.org/docs/api/process)
    - [Node.js: Process](https://nodejs.org/api/process.html)
- [Doc: shell](https://www.electronjs.org/docs/api/shell)
- [Doc: nativeImage](https://www.electronjs.org/docs/api/native-image)
    - [MDN: Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- [Doc: clipboard](https://www.electronjs.org/docs/api/clipboard)

### 补充技术

幕后渲染：

- [Doc: Offscreen Rendering](https://www.electronjs.org/docs/tutorial/offscreen-rendering)

网络检测：

- [MDN: Online & Offline Events](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events)
- [MDN: onLine](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine)

通知：

- [Doc: Notifications](https://www.electronjs.org/docs/tutorial/notifications)
  -[MDN: Notification](https://developer.mozilla.org/en-US/docs/Web/API/notification)

安全：

-[Doc: Security, Native Capabilities, and Your Responsibility](https://www.electronjs.org/docs/tutorial/security)

- [Doc: Context Isolation](https://www.electronjs.org/docs/tutorial/context-isolation)
- [Doc: contextBridge](https://www.electronjs.org/docs/api/context-bridge)

进度条：

- [Doc: Progress Bar in Taskbar](https://www.electronjs.org/docs/tutorial/progress-bar)

### MacOS

- [Doc: TouchBar](https://www.electronjs.org/docs/api/touch-bar)

## 项目说明

### 去除 preload 脚本

通过 `nodeIntegration` 及 `contextIsolation` 配置，可去除掉 preload 脚本。

> 从渲染器进程中直接访问 Node.js API，但安全性较差（因为 Node 主进程可直接访问系统中的文件），不建议用于加载非开发者可控的远程资源。

### 页面 CSP

简化 CSP，添加支持内嵌资源（`'unsafe-inline'`）的策略。

- [MDN: Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### 保存窗口位置与尺寸

- [Module: electron-window-state](https://github.com/mawie81/electron-window-state)

### 项目命令行工具

运行程序：

```bash
npm run start
```

开发模式（自动重启服务）：

```bash
npm run watch

rs
```

打包与发布（自动识别当前平台）：

```bash
npm run package

npm run make
```
