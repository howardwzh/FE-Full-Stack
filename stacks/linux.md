## 参考资料
- [Linux 教程](http://www.runoob.com/linux/linux-tutorial.html)
- [初窥Linux 之 我最常用的20条命令](https://blog.csdn.net/ljianhui/article/details/11100625)
- [如何在Linux上设置ZSH和Oh-my-zsh](https://www.howtoing.com/how-to-setup-zsh-and-oh-my-zsh-on-linux)

## 安装设置zsh和Oh-my-zsh
```zsh
# 安装zsh
yum install zsh

# 设置成默认shell
chsh -s /bin/zsh root

# 安装oh-my-zs
yum install wget git

wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
source ~/.zshrc
```

## 常用的命令

### netstat 查看端口
```zsh
# 安装
yum install net-tools

# 查看端口号
netstat –nltp

# 查看端口号是否被占用
netstat -pan|grep 2809
```