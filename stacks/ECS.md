## 参考资料
- [ECS上搭建Docker(CentOS7)](https://help.aliyun.com/document_detail/51853.html)

## 基础操作（CentOS7为例）
### 登录到服务器
- 查看ECS详情，找到公网ip，设置一下登录名/密码
- Mac下，在终端中使用命令`ssh root@xxx.xxx.xx.xx`登录进去
- 查看系统信息`lsb_release -a`

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
```
# docker info
```

## 拉取镜像，运行进入容器（以nginx为例）
1. 拉取nginx镜像
```
# docker pull nginx
```

2. 查看已有镜像
```
# docker images
```

3. 运行容器
```
# docker run -d --name nginx 06144b287844
```
run命令加上–d参数可以在后台运行容器，—name指定容器命名为apache

4. 进入后台运行到容器
```
# docker exec -ti nginx /bin/bash
```

5. 为了方便测试和恢复，先将源镜像运行起来后再做一个命名简单的镜像做测试。
```
# docker commit 06144b287844 nginx:v1
```

6. 运行容器并将宿主机的8080端口映射到容器里去。
```
# docker run -d -p 8080:80 nginx:v1
```

**PS：如果需要vim没有的话，需要自己安装**
```
apt-get update
apt-get install vim
```

7. 退出容器
```
# exit
```

8. 登录阿里镜像仓库
```
# docker login --username=阿里云账户全名 registry-vpc.cn-hongkong.aliyuncs.com
# docker tag [ImageId] registry-vpc.cn-hongkong.aliyuncs.com/howardwzh/[镜像名]:[镜像版本号]
# docker push registry-vpc.cn-hongkong.aliyuncs.com/howardwzh/[镜像名]:[镜像版本号]
```
**PS: 管理控制台 -> 容器镜像服务 -> 镜像仓库 -> 设置Registry登录密码**