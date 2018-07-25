- [webp](#webp)

## webp
> 想将webp引入项目中，就必须解决兼容性问题，现在就研究一下吧。

### 参考/资源
- [把网站的图片升级到WebP格式吧](https://segmentfault.com/a/1190000007482148)
- [webp图片实践之路](http://web.jobbole.com/87650/)

### 兼容html中的img

1. 检测是否支持webp，进入落地页（入口文件）便执行，并保存到localstorage里持久标识。
```js
function checkWebp (callback) {
  window.isSupportWebp = window.isSupportWebp || localStorage.getItem('isSupportWebp')
  if (/^(true|false)$/.test(window.isSupportWebp)) {
    callback(window.isSupportWebp)
    return
  }
  new Promise((resolve) => {
    const img = new Image()
    img.onload = function () {
      resolve(`${img.width > 0 && img.height > 0}`)
    }
    img.onerror = function () {
      resolve('false')
    }
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  }).then((res) => {
    window.isSupportWebp = res
    localStorage.setItem('isSupportWebp', res)
    callback(res)
  })
}
```

2. 根据是否支持webp来替换src的后缀
```js
function setImageSrc (isSupportWebp) {
  var imgs = Array.from(document.querySelectorAll('img'))
  imgs.forEach (function(i) {
    var src = i.attributes['data-src'].value
    if (`${isSupportWebp}` === 'true'){
      src = src.replace(/\.jpg$/, '.webp')
    }
    i.src = src
  })
}
```

3. 进入不同页面（路由）执行
```js
checkWebp(setImageSrc)
```