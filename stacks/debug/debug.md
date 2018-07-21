> 调试

## 参考/资源
- [spy-debugger](https://github.com/wuchangming/spy-debugger)

## 目录
- 手机调试
    - [spy-debugger](#spy-debugger)

### spy-debugger (缺点：没有source可调试)
#### 安装
```
npm install spy-debugger -g
```

#### 三分钟上手
1. 手机和PC保持在同一网络下（比如同时连到一个Wi-Fi下）
2. 命令行输入`spy-debugger`，按命令行提示用浏览器打开相应地址。
3. 设置手机的HTTP代理，代理IP地址设置为PC的IP地址，端口为spy-debugger的启动端口(默认端口：9888)。
    - **Android**设置代理步骤：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
    - **iOS**设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动
4. 手机安装证书。注：手机必须先设置完代理后再通过(非微信)手机浏览器访问 http://s.xxx (下图地址二维码) 安装证书
![](./assets/QRCodeForCert.png)
> PS: (手机首次调试需要安装证书，已安装了证书的手机无需重复安装)。问题：iOS 10.3.1以上版本证书安装问题
5. 用手机浏览器访问你要调试的页面即可。

#### 自定义选项
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
