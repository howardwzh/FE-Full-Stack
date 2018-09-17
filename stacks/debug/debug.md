> 调试

## 参考/资源
- [移动端调试痛点？——送你五款前端开发利器](https://juejin.im/post/5b72e1f66fb9a009d018fb94)
- [whistle](http://wproxy.org/whistle/)
- [spy-debugger](https://github.com/wuchangming/spy-debugger)
- [零基础学习 Fiddler 抓包改包](https://juejin.im/entry/586b3f0a61ff4b006dd4f3e4)

## whistle
### 安装
```zsh
# 全局安装
yarn global add whistle

# 查看安装是否成功
w2 help
```

### 使用
```zsh
# 启动
w2 start

# 重启
w2 restart

# 停止
w2 stop

# 调试模式启动
w2 run
```

### 配置代理
```conf
# 手动配置wifi的代理
Step 1: ip = 实际电脑ip
Step 2: port = 8899
```

### 访问配置页面
- [http://127.0.0.1:8899](http://127.0.0.1:8899)

### 接口请求转发
#### Step 1: 左侧导航，进入`Rules`
#### Step 2: 根据需要增加规则
```conf
# 形如：匹配的地址   转向的新地址
http://192.168.0.121:8080/xxx/yyy/zzz   http://192.168.11.105:8080
http://192.168.0.121:8080/xxx   http://www.wzhtest.com/xxx/yyy
```

## spy-debugger
### 安装
```
npm install spy-debugger -g
```

### 三分钟上手
1. 手机和PC保持在同一网络下（比如同时连到一个Wi-Fi下）
2. 命令行输入`spy-debugger`，按命令行提示用浏览器打开相应地址。
3. 设置手机的HTTP代理，代理IP地址设置为PC的IP地址，端口为spy-debugger的启动端口(默认端口：9888)。
    - **Android**设置代理步骤：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
    - **iOS**设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动
4. 手机安装证书。注：手机必须先设置完代理后再通过(非微信)手机浏览器访问 http://s.xxx (下图地址二维码) 安装证书
![](./assets/QRCodeForCert.png)
> PS: (手机首次调试需要安装证书，已安装了证书的手机无需重复安装)。问题：iOS 10.3.1以上版本证书安装问题
5. 用手机浏览器访问你要调试的页面即可。

### 自定义选项
1. 端口 (默认端口：9888)
```
spy-debugger -p 8888
```
2. 设置外部代理（默认使用AnyProxy）
```
spy-debugger -e http://127.0.0.1:8888
```
> PS: spy-debugger内置AnyProxy提供抓包功能，但是也可通过设置外部代理和其它抓包代理工具一起使用，如：Charles、Fiddler。
3. 设置页面内容为可编辑模式 (默认： false)
```
spy-debugger -w true
```
> PS: 在需要调试的页面内注入代码：document.body.contentEditable=true。暂不支持使用了iscroll框架的页面。
4. 是否允许weinre监控iframe加载的页面 (默认： false)
```
spy-debugger -i true
```
5. 是否只拦截浏览器发起的https请求 (默认： true)
```
spy-debugger -b false
```
> PS: 有些浏览器发出的connect请求没有正确的携带userAgent，这个判断有时候会出错，如UC浏览器。这个时候需要设置为false。大多数情况建议启用默认配置：true，由于目前大量App应用自身（非WebView）发出的请求会使用到SSL pinning技术，自定义的证书将不能通过app的证书校验。
6. 是否允许HTTP缓存 (默认： false)
```
spy-debugger -c true
```

## genymotion debug
### chrome inspect
- [打开inspect页面](chrome://inspect/#devices)
- 找到要debug的页面，直接点击进入
- **必须翻墙**，因为无法访问 https://chrome-devtools-frontend.appspot.com，只能出现空白页面