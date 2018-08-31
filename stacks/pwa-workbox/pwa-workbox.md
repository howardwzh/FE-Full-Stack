## 参考资源
- [Workbox 官方文档](https://developers.google.com/web/tools/workbox/)
- [Workbox 3：Service Worker 可以如此简单](http://taobaofed.org/blog/2018/08/08/workbox3/)
- [神奇的 Workbox 3.0](https://zoumiaojiang.com/article/amazing-workbox-3/)
- [Workbox 入门](http://csbun.github.io/blog/2018/02/workbox/)

## 开箱笔记

### 背景
- 一套 Web App 静态资源和请求结果的本地存储的解决方案
- 背后则是 Service Worker 和 Cache API 等技术和标准在驱动
- 真正能方便统一的处理离线能力的更完美的方案

### 特点
- 不管你的站点是何种方式构建的，都可以为你的站点提供离线访问能力。
- 就算你不考虑离线能力，也能让你的站点访问速度更加快。
- 几乎不用考虑太多的具体实现，只用做一些配置。
- 简单却不失灵活，可以完全自定义相关需求（支持 Service Worker 相关的特性如 Web Push, Background sync 等）。
- 针对各种应用场景的多种缓存策略。

### 基本用法
#### 1. Service Worker 文件 sw.js

```js
// workbox 2.x 是将 workbox 核心内容放在 workbox-sw node_modules 包里维护的
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
}
else {
    console.log(`Boo! workbox didn't load 😬`);
}
```

#### 2. index.html

```html
<script>
// 可以这么注册 Service Worker
if ('serviceWorker' in navigator) {
    // 为了保证首屏渲染性能，可以在页面 load 完之后注册 Service Worker
    window.onload = function () {
        navigator.serviceWorker.register('/sw.js');
    };
}
</script>
```

#### 3. 回到sw.js，配置 **precache (预缓存)** 静态文件，这样就可以 **实现离线加载**

```js
workbox.precaching.preacheAndRoute([
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    {
        url: '/index.html',
        revision: '383676'
    },
]);
```

#### 4. 生成预缓存列表
  - workbox 命令行
  - workbox-build npm 包
  - workbox-webpack-plugin

这里主要介绍 **workbox-webpack-plugin**

```js
//webpack.config.js

const workboxPlugin = require('workbox-webpack-plugin');

// ...
webpack({
    plugins: [
        // ...
        new workboxPlugin({
            swSrc: './src/sw.js',
            swDest: './dist/sw.js',
            globDirectory: './dist/',
            globPatterns: ['**/*.{html,js,css}'],
        })
    ]
    // ...
});
```

```js
//app/sw.js
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
```

#### 5. 路由请求缓存（离线不能加载）

匹配方式
- 字符串方式
- 正则表达式方式
- 回调函数方式

缓存策略
- staleWhileRevalidate：返回 Cache 缓存结果，同时后台发起网络请求更新 Cache 缓存
- networkFirst：网络优先的策略，并更新至 Cache 缓存
- cacheFirst： 直接从 Cache 缓存中取得结果，没有的话才会发起网络请求，并更新至 Cache 缓存
- networkOnly：直接强制使用正常的网络请求
- cacheOnly：直接使用 Cache 缓存的结果，这种策略比较适合一上线就不会变的静态资源请求
- [自定义策略](https://zoumiaojiang.com/article/amazing-workbox-3/#-6)

几个栗子
```js
workbox.routing.registerRoute(
    new RegExp('.*\.js'), // 这里是任何正则都行，只要能匹配得上的请求路由地址
    workbox.strategies.networkFirst() // 网络优先的策略
);
```
PS: workbox 3 可以允许 **第三方请求** 的 **networkFirst** 和 **stalteWhileRevalidate** 缓存策略生效

#### 6. [workbox 配置](https://zoumiaojiang.com/article/amazing-workbox-3/index.html#workbox-1)

#### 7. [workbox 插件](https://zoumiaojiang.com/article/amazing-workbox-3/index.html#workbox-2)
