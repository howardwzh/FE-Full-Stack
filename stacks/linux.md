## 参考资料
- [Linux 教程](http://www.runoob.com/linux/linux-tutorial.html)
- [Linux 命令大全](http://www.runoob.com/linux/linux-command-manual.html)
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

### uname 显示一些重要的系统信息
```zsh
uname -a
```

### `ls` 查看文件与目录
```zsh
# 列出长数据串，包含文件的属性与权限数据等
ls -l

# 列出全部的文件，连同隐藏文件
ls -a

# 仅列出目录本身
ls -d

# 仅列出目录本身
ls -h

# 连同子目录的内容
ls -h
```

### `grep` 分析筛选
```zsh
# 取出文件/etc/man.config中包含MANPATH的行，并把找到的关键字加上颜色
grep --color=auto 'MANPATH' /etc/man.config

# 把ls -l的输出中包含字母file（不区分大小写）的内容输出
ls -l | grep -i file

# -a ：将binary文件以text文件的方式查找数据
# -c ：计算找到‘查找字符串’的次数
# -i ：忽略大小写的区别，即把大小写视为相同
# -v ：反向选择，即显示出没有‘查找字符串’内容的那一行
```

### `find` 查找
```zsh
# 查找文件名为passwd的文件
find / -name passwd
```

### `cp` 复制
```zsh
# 连同文件的所有特性把文件file1复制成文件file2
cp -a file1 file2

# 把文件file1、file2、file3复制到目录dir中
cp file1 file2 file3 dir

# -r ：递归持续复制，用于目录的复制行为
# -u ：目标文件与源文件有差异时才会复制
```

### `netstat` 查看端口
```zsh
# 安装
yum install net-tools

# 查看端口号
netstat –nltp

# 查看端口号是否被占用
netstat -pan|grep 2809
```

### chmod 权限设置
```zsh
# 给指定文件的属主和属组所有权限(包括读、写、执行)
chmod ug+rwx file.txt

# 删除指定文件的属组的所有权限
chmod g-rwx file.txt

# 递归修改目录下面所有文件和子目录的权限
chmod -R ug+rwx path/of/dir
```

### ps 打印进程运行情况
```zsh
ps aux # 查看系统所有的进程数据
ps ax # 查看不与terminal有关的所有进程
ps -lA # 查看系统所有的进程数据
ps axjf # 查看连同一部分进程树状态
```

### mv 移动
```zsh
# 把文件file1、file2、file3移动到目录dir中
mv file1 file2 file3 dir

# 把文件file1重命名为file2
mv file1 file2

# -f ：force强制的意思，如果目标文件已经存在，不会询问而直接覆盖
# -i ：若目标文件已经存在，就会询问是否覆盖
# -u ：若目标文件已经存在，且比目标文件新，才会更新
```

### rm 删除
```zsh
rm -fr dir # 强制删除目录dir中的所有文件
```

### kill 向某个 工作（%jobnumber） 或者是某个 PID（数字） 传送一个信号


### tar 压缩/解压
```zsh
# 压缩
tar -jcv -f filename.tar.bz2 path/of/file
tar -jcv -f filename.tar.bz2 path/of/dir

# 查询
tar -jtv -f filename.tar.bz2

# 解压
tar -jxv -f filename.tar.bz2 -C path/of/dest
```

### whereis 查找某个命令的位置
```zsh
whereis node
```

### passwd 修改密码
```zsh
# 输入旧密码，然后输入新密码
passwd

# 超级用户 修改其他用户的密码
passwd USERNAME

# root用户 删除某个用户的密码
passwd -d USERNAME
```

## 常用功能
### ping
```zsh
apt-get update
apt-get install inetutils-ping
```