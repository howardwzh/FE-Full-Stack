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
function setImageByWebp (isSupportWebp) {
  var imgs = Array.from(document.querySelectorAll('img'))
  imgs.forEach (function(i) {
    var src = i.attributes['data-src'].value
    if (`${isSupportWebp}` === 'true'){
      src = src.replace(/\.jpg$/, '.webp')
    }
    i.src = src
  })
  // 设置根dom的class=webps，以便css中进行区分
  document.documentElement.className += " webps";
}
```

3. 进入不同页面（路由）执行
```js
checkWebp(setImageSrc)
```

### 兼容css中的background-image
> PS：还记得上面设置的根dom的class=webp吗？现在就有用了。

- 如果用scss
```css
/*
  通过这个函数来引入图片，例如：
  #wrapper{ @include bg('../img/sample.jpg') }
  这段代码经过编译后便会生成如下两句代码
  #wrapper{ background-image:url('../img/sample.jpg'); }
  .webp #wrapper{ background-image:url('../img/sample.jpg.webp'); }
 */
@mixin bg($url) {
  background-image: url($url);
  @at-root(with: all) .webps & {
    background-image: url($url + '.webp');
  }
}
```

- 如果用less
```css
.mixin(@url) {
  background-image: url(@url);
  .webps & {
    background-image: url('@{url}.webp');
  }
}
```

### 使用工具自动生成webp的图片
- 使用webpack-loader
- 开启node服务监听images里的普通图片，并自动生成对应的webp图片
