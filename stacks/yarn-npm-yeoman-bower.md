[Back](../README.md)
#Npm & Bower & Yeoman


#目录

1. [npm](#npm)
2. [bower](#bower)
3. [yeoman](#yeoman)


#正文

###npm
**安装npm**

安装node.js就自带npm，如果想update npm可以
```
npm install npm -g
```
`npm -v`查看版本

安装package.json中的包
```
npm install
or
npm i
```
以下用简写：`npm i`


移除package.json中没有的包
```
npm prune
```

安装新的包，并加入到package.json的devDependencies中
```
npm i --save-dev <packageName>
```

安装新的包到全局环境
```
npm i -g <packageName>
```

###bower
**安装bower**
```
npm i -g bower 
```

安装bower.json中的包
```
bower install
or
bower i
```
以下用简写：`bower i`

移除bower.json中没有的包
```
bower prune
```

安装新的包，并加入到bower.json的devDependencies中
```
bower i --save <packageName>
```

更新已有的包
```
bower update <packageName>
```

###yeoman
**安装yo**
```
npm i -g yo
```

例：安装generator-gulp-angular

```
npm install -g generator-gulp-angular
    |
mkdir my-new-project
    |
cd my-new-project
    |
yo gulp-angular
```
然后在安装过程中选择需要的服务





