## 参考资料
- [ECS上搭建Docker(CentOS7)](https://help.aliyun.com/document_detail/51853.html)

## 基础操作（CentOS7为例）
### 登录到服务器
- 查看ECS详情，找到公网ip，设置一下登录名/密码
- Mac下，在终端中使用命令`ssh root@xxx.xxx.xx.xx`登录进去
- 查看系统信息`lsb_release -a`

### (Mac + scp) **上传/下载** 文件到ECS
> **scp** 就是secure copy，是用来进行远程文件拷贝的。数据传输使用 ssh，并且和ssh 使用相同的认证方式，提供相同的安全保证。 
> 
> 【优点】简单方便，安全可靠；支持限速参数
#### 上传
```zsh
# 传文件
scp /Users/wangzhonghua/Documents/fileName root@xxx.xx.xxx.xx:/usr/local/src/

# 传目录
scp -r /Users/wangzhonghua/Documents/folderName root@xxx.xx.xxx.xx:/usr/local/src/

# docker宿主机传容器
docker cp /usr/local/src/dist containerID:/usr/local/src/
```

#### 下载
```zsh
## 下载文件
scp root@xxx.xx.xxx.xx:/usr/local/src/fileName /Users/wangzhonghua/Documents/ 

## 下载目录
scp -r root@xxx.xx.xxx.xx:/usr/local/src/folderName /Users/wangzhonghua/Documents/ 

## 把 xxx.xx.xxx.11 的文件拷贝到 xxx.xx.xxx.22 的/usr/local/src目录下
scp root@xxx.xx.xxx.11:/usr/local/src/fileName root@xxx.xx.xxx.22:/usr/local/src/

## docker容器传宿主机
docker cp containerID:/usr/local/src/ /usr/local/src/dist 
```

## 安装Docker
1. 添加yum源。
```
# yum install epel-release –y
# yum clean all
# yum list
```

2. 安装并运行Docker。
```
# yum install docker-io –y
# systemctl start docker
```

3. 检查安装结果。
```zsh
docker info
```

## 拉取镜像，运行进入容器（以nginx为例）
1. 拉取nginx镜像
```zsh
docker pull nginx
```

2. 查看已有镜像
```zsh
docker images
```

3. 运行容器
```zsh
docker run -dit --name nginx 06144b287844

# 查看所以运行的容器
docker container ls
# 停止容器
docker container stop containerID
```
run命令加上–d参数可以在后台运行容器，—name指定容器命名为nginx

4. 进入后台运行到容器
```zsh
docker exec -ti nginx /bin/bash
```

5. 为了方便测试和恢复，先将源镜像运行起来后再做一个命名简单的镜像做测试。
```zsh
docker commit 06144b287844 nginx:v1
```

6. 运行容器并将宿主机的8080端口映射到容器里去。
```zsh
docker run -dit -p 8080:80 nginx:v1
```

**PS：如果需要vim没有的话，需要自己安装**
```zsh
apt-get update
apt-get install vim
```

7. 退出容器
```
# exit
```

8. 登录阿里镜像仓库
```zsh
docker login --username=阿里云账户全名 registry-vpc.cn-hongkong.aliyuncs.com
docker tag [ImageId] registry-vpc.cn-hongkong.aliyuncs.com/howardwzh/[镜像名]:[镜像zsh版本号]
docker push registry-vpc.cn-hongkong.aliyuncs.com/howardwzh/[镜像名]:[镜像版本号]
```
**PS: 管理控制台 -> 容器镜像服务 -> 镜像仓库 -> 设置Registry登录密码**

9. 删除镜像
```zsh
docker rmi –f [镜像名]
```

10. 删除容器
```zsh
docker rm [容器名/容器ID]
```

## [安装Yapi](./mock-data/yapi.md)
