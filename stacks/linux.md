## 参考资料
- [Linux 教程](http://www.runoob.com/linux/linux-tutorial.html)
- [初窥Linux 之 我最常用的20条命令](https://blog.csdn.net/ljianhui/article/details/11100625)

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