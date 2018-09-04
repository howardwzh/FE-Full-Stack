## 参考资料
- [Mac下，nvm安装Node及配置](https://www.jianshu.com/p/a3f8778bc0a1)


## Mac下使用nvm
### 安装nvm

#### 1. 输入如下命令：
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
```

#### 2. 此时nvm就被安装在了/.nvm下啦，接下来就需要配一下环境变量了，这里以zsh(其它可选/.bash_profile或者/.profile，~/.bashrc)为例，编辑器打开~/.zshrc文件。
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

#### 3. 输入`nvm`看到如下信息：
```
Node Version Manager
Note: <version> refers to any version-like string nvm understands. This includes:
   full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
   default (built-in) aliases: node, stable, unstable, iojs, system
   custom aliases you define with `nvm alias foo`
Usage:
  nvm help                                  Show this message
  nvm --version                             Print out the latest released version of nvm
  nvm install [-s] <version>                Download and install a <version>, [-s] from source. Uses .nvmrc if available
    --reinstall-packages-from=<version>     When installing, reinstall packages installed in <node|iojs|node version number>
  nvm uninstall <version>                   Uninstall a version
...
```

### 安装Node
#### 1. 查看Node所有版本，用`nvm ls-remote`命令
#### 2. 正常安装的话，会超级慢，推荐使用国内镜像
编辑`vim ~/.zshrc`：
```
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```

保存后启用
```
source ~/.zshrc
```

执行安装
```
nvm install v8.11.4
```
需要哪个版本，就在最后 **将6换成对应的版本号** 就行，**默认下载版本中最新的版本号**

### 切换Node版本
#### 1. 打印node版本列表
```
nvm ls
```

#### 2. 切换Node版本
```
nvm use 8.11.4
```

#### 3. 设置默认Node版本
```
nvm alias default 8.11.4
```