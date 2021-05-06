# Electron 样板项目

## 官方模板项目

- [electron / electron-quick-start](https://github.com/electron/electron-quick-start)

## 必读文档

- [Electron Documentation - Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start)
- [Electron Documentation - Application Debugging](https://www.electronjs.org/docs/tutorial/application-debugging)
- [Electron Documentation - Debugging the Main Process](https://www.electronjs.org/docs/tutorial/debugging-main-process)
- [Electron Documentation - Using Native Node Modules](https://www.electronjs.org/docs/tutorial/using-native-node-modules)

### 主进程

- [Electron Documentation - API](https://www.electronjs.org/docs/api)
- [Electron Documentation - app](https://www.electronjs.org/docs/api/app)
- [Electron Documentation - BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
- [Electron Documentation - webContents](https://www.electronjs.org/docs/api/web-contents)
- [Electron Documentation - session](https://www.electronjs.org/docs/api/session)
- [Electron Documentation - Class: Cookies](https://www.electronjs.org/docs/api/cookies)
- [Electron Documentation - Class: DownloadItem](https://www.electronjs.org/docs/api/download-item)
- [Electron Documentation - dialog](https://www.electronjs.org/docs/api/dialog)
- [Electron Documentation - powerMonitor](https://www.electronjs.org/docs/api/power-monitor)
- [Electron Documentation - screen](https://www.electronjs.org/docs/api/screen)

全局快捷键：

- [Electron Documentation - Accelerator](https://www.electronjs.org/docs/api/accelerator)
- [Electron Documentation - globalShortcut](https://www.electronjs.org/docs/api/global-shortcut)

菜单（局部快捷键）：

-[Electron Documentation - Menu](https://www.electronjs.org/docs/api/menu)
-[Electron Documentation - MenuItem](https://www.electronjs.org/docs/api/menu-item)

系统工具栏图标：

- [Electron Documentation - Tray](https://www.electronjs.org/docs/api/tray)
- [Electron Documentation - nativeImage](https://www.electronjs.org/docs/api/native-image)
- [Retina Web Graphics Explained: 1x versus 2x (Low‑Res versus Hi‑Res)](https://www.danrodney.com/blog/retina-web-graphics-explained-1x-versus-2x-low-res-versus-hi-res/)

## 项目说明

### 去除 preload 脚本

通过 `nodeIntegration` 及 `contextIsolation` 配置，可去除掉 preload 脚本。

> 可从渲染进程中直接访问 Node.js API，但安全性会差些，不建议用于加载远程资源。

### 页面 CSP

简化 CSP，添加支持内嵌资源（`'unsafe-inline'`）的策略。

- [MDN - Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

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
