# photoshop

# sublime-text

# nvm

## 安装

- 先要卸载原来的nodejs
- [下载nvm-windows](https://github.com/coreybutler/nvm-windows/releases)后，双击安装即可

## 配置

一般来说用nvm下载安装node可能受到国内网络的影响会比较慢，可以采用**淘宝镜像**

```
## 设置淘宝镜像
nvm node_mirror npm.taobao.org/mirrors/node/
nvm npm_mirror npm.taobao.org/mirrors/npm/

## 然后安装nodejs
nvm install 6.8.0
nvm install 7.8.0
nvm install 8.1.0

## 列出所有node版本
nvm list

## 指定要使用的版本
nvm use 7.8.0

## 卸载指定的node版本
nvm uninstall 6.8.0
```