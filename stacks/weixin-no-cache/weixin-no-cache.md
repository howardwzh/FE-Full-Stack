## 参考资料
- [我想转行之----微信浏览器缓存](https://www.jianshu.com/p/cce9511c0914)
> F：设置nginx的缓存机制；直接将nginx的缓存设置成{expires-1;}，设置成永远不缓存；如果没有nginx，其他apache什么的通用这个方法。
> 
> 到这里，缓存问题总算解决了！

## checklist
### 1. 页面meta设置无缓存
```html
...
<meta http-equiv="cache-control" content="max-age=0">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
...
```

### 2. 隐式授权似乎也有清缓存效果，特别是针对打开的第一个页面
> [腾讯OAuth2.0隐式授权介绍](http://www.voidcn.com/article/p-taanmrhq-sn.html)

### 3. 跳转url后加`?t=83923232032`
```js
function makeUrlNoCache (url) {
    return url.replace(/(.*html)(\?)/, "$1&").replace(/(.*html)(.*)/, "$1?t=" + (new Date).getTime() + "$2")
}
```

### 4. 浏览器“返回”检查是否需要强制刷新
```js
window.onpageshow = function(event) {
 if (event.persisted) {
   window.location.reload()
 }
};
```

### 5. 服务器端设置
- 设置nginx的缓存机制；直接将nginx的缓存设置成`expires -1;`，设置成永远不缓存
- 如果没有nginx，其他apache什么的通用这个方法