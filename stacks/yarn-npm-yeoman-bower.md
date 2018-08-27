
> - [在5分钟内搭建企业内部私有npm仓库](https://github.com/jaywcjlove/handbook/blob/master/CentOS/%E5%9C%A85%E5%88%86%E9%92%9F%E5%86%85%E6%90%AD%E5%BB%BA%E4%BC%81%E4%B8%9A%E5%86%85%E9%83%A8%E7%A7%81%E6%9C%89npm%E4%BB%93%E5%BA%93.md)
> - [Verdaccio · A lightweight private npm proxy registry](https://github.com/verdaccio/verdaccio)


#目录

- [yarn](#yarn)
- [npm](#npm)
- [bower](#bower)
- [yeoman](#yeoman)

### [yarn](https://yarnpkg.com/zh-Hans/)
**安装yarn**
```shell
brew install yarn
```

### npm
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

设置registry
```
npm config set --registry <registry url>
```

### bower
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

### yeoman
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





