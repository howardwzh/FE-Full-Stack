[Back](../README.md)
#Sublime Text3

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

#文章
- [一个前端程序猿的Sublime Text3的自我修养](http://guowenfh.github.io/2015/12/26/SublimeText/)
- [如何优雅地使用Sublime Text3](http://www.jianshu.com/p/3cb5c6f2421c)



#目录

1. [常用插件](#常用插件)
2. [插件包官网](https://packagecontrol.io/browse)


#正文

###常用插件

- Package Control
- Emmet
- JsFormat
- SideBarEnhancements
- bracketHighlighter
- Terminal
- SublimeLinter
- SublimeCodeIntel
- SublimeTmpl
- SublimeServer
- LESS
- [Less2Css](#Less2Css)
- AutoFileName
- FileDiffs
- DocBlockr
- JSDoc
- PLAIN TASKS
- AngularJS
- CSS Format
- HTML5
- jQuery
- ColorPicker
- Tag
- MarkdownEditing

###部分插件说明
####Less2Css
需要安装less依赖
- Less2Css插件依赖lessc这个工具，在windows下可以下载或者用 `git clone less.js-windows` 到本地目录。然后把目录地址加入到环境变量PATH的中
- Mac下需要依赖nodejs和lessc，首先需要安装nodejs，然后 `npm install less -gd`,安装后 `lessc` 检测是否成功

