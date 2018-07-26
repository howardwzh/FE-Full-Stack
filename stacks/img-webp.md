- [webp](#webp)

## webp
> 想将webp引入项目中，就必须解决兼容性问题，现在就研究一下吧。

### 参考/资源
- [把网站的图片升级到WebP格式吧](https://segmentfault.com/a/1190000007482148)
- [webp图片实践之路](http://web.jobbole.com/87650/)

### 兼容html中的img

#### html5新标签
```html
<picture class="picture">
  <source type="image/webp" srcset="./images/universe.jpg.webp">
  <img class="image" src="./images/universe.jpg">
</picture>
```

#### 脚本方式
1. 检测是否支持webp，进入落地页（入口文件）便执行，并保存到localstorage里持久标识。
```js
function checkWebp (callback = setImageByWebp) {
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
  const imgs = Array.from(document.querySelectorAll('img'))
  isSupportWebp = `${isSupportWebp}` === 'true'
  imgs.forEach (function(i) {
    if (!i.attributes['data-src']) return
    const src = i.attributes['data-src'].value
    if (isSupportWebp){
      src = src.replace(/\.jpg$/, '.webp')
    }
    i.src = src
  })
}
```

3. 根据是否支持webp，设置根html的class=webps，以便css中进行区分
```js
function setHtmlClassByWebp (isSupportWebp) {
  if (`${isSupportWebp}` === 'true') {
    document.documentElement.className += " webps"
  }
}
```

4. 进入不同页面（路由）执行
```js
checkWebp(setImageByWebp)
checkWebp(setHtmlClassByWebp)
```


### 兼容css中的background-image
> PS：还记得上面`checkWebp(setHtmlClassByWebp)`吗？现在就有用了。

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
  background-repeat: no-repeat;
  background-size: contain;
  @at-root(with: all) .webps & {
    background-image: url($url + '.webp');
  }
}
```

- 如果用less
```css
.mixinwebp(@url) {
  background-image: url(@url);
  background-repeat: no-repeat;
  background-size: contain;
  .webps & {
    background-image: url('@{url}.webp');
  }
}
```

### 使用工具自动生成webp的图片
- 使用webpack-loader
```js

```

- 开启node服务监听images里的普通图片，并自动生成对应的webp图片
[下载google转换命令](https://developers.google.com/speed/webp/download)
```js
/*
    webp图片生成
    
    运行：npm install && npm start
 
    程序依赖谷歌官方webp转换工具cwebp
    mac下安装 brew install webp
    windows下可以去google官方下载
 
    安装完成后运行cwebp -h 如果显示了使用帮助则表示安装成功
 */
 
const process = require('child_process');
const fs = require('fs');
const chokidar = require('chokidar');
 
const log = console.log.bind(console);
const ignoreFiles = /(^\..+)|(.+[\/\\]\..+)|(.+?\.webp$)/; // 忽略文件.开头和.webp结尾的
 
let quality = 75; // webp图片质量，默认75
let imgDir = 'images'; // 默认图片文件夹
 
// 得到对应的webp格式的文件名，默认为文件名后加上.webp
function getWebpImgName(path) {
    return `${path}.webp`;
}
 
// 得到shell命令
function getShellCmd(path) {
  if (/.*\.gif$/.test(path)) {
    return `gif2webp -q ${quality} ${path} -o ${getWebpImgName(path)}`;
  } else {
    return `cwebp -q ${quality} ${path} -o ${getWebpImgName(path)}`;
  }
}
 
// 监控文件夹
var watcher = chokidar.watch(imgDir, {
    ignored: path => {
        return ignoreFiles.test(path);
    },
    persistent: true // 保持监听状态
});
 
// 监听增加，修改，删除文件的事件
watcher.on('all', (event, path) => {
    switch (event) {
        case 'add':
        case 'change':
            generateWebpImg(path, (status) => {
                log('生成图片' + getWebpImgName(path) + status);
            });
            break;
        case 'unlink':
            deleteWebpImg(getWebpImgName(path), (status) => {
                log('删除图片' + getWebpImgName(path) + status);
            });
            break;
        default:
            break;
    }
});
 
log('biubiubiu~~~ 监控已经启动');
 
function generateWebpImg(path, cb) {
    process.exec(getShellCmd(path), err => {
        if (err !== null) {
            cb('失败');
            log('请先运行cwebp -h命令检查cwebp是否安装ok。')
            log(err);
        } else {
            cb('成功');
        }
    });
}
 
function deleteWebpImg(path, cb) {
    fs.unlink(path, (err) => {
        if (err) {
            cb('失败');
            log(err)
        } else {
            cb('成功');
        };
    });
}
```
