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

## 项目说明

### 去除 preload 脚本

通过 `nodeIntegration` 及 `contextIsolation` 配置，可去除掉 preload 脚本。

> 可从渲染器进程中直接访问 Node.js API。

### 页面 CSP

简化 CSP，添加支持内嵌资源的策略。

- [MDN - Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### 项目命令行工具

运行程序：

```bash
npm start
```

开发模式（自动重启服务）：

```bash
npm watch
```
