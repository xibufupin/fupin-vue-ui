# fupin-vue-ui
一个基于VUE3.0在Web端实现模仿Windows的图形界面及交互操作的项目

## 使用方法

### 第一步，安装依赖
```
yarn add fupin-vue-core
yarn add fupin-vue-ui
```

### 第二步，写一个main.js(ts)，下面是示例，具体根据自己代码来
```
import { createApp } from ‘vue'
import FupinCore from 'fupin-vue-core'
import FupinUi from 'fupin-vue-ui'
import App from './App.vue'
createApp(App).use(new FupinCore).use(new FupinUi).mount("body")
```

### 第三步，在App.vue添加一个入口
```<template><f-screen /></template>```
