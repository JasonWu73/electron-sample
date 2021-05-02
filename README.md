# Electron 样板项目

## 官方模板项目

- [electron / electron-quick-start](https://github.com/electron/electron-quick-start)

## 必读文档

- [Electron Documentation - Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start)
- [Electron Documentation - Application Debugging](https://www.electronjs.org/docs/tutorial/application-debugging)
- [Electron Documentation - Debugging the Main Process](https://www.electronjs.org/docs/tutorial/debugging-main-process)
- [Electron Documentation - Using Native Node Modules](https://www.electronjs.org/docs/tutorial/using-native-node-modules)

## API 文档

- [Electron Documentation - API](https://www.electronjs.org/docs/api)
- [Electron Documentation - app](https://www.electronjs.org/docs/api/app)
- [Electron Documentation - BrowserWindow](https://www.electronjs.org/docs/api/browser-window)
- [Electron Documentation - webContents](https://www.electronjs.org/docs/api/web-contents)
- [Electron Documentation - session](https://www.electronjs.org/docs/api/session)

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
