## 参考/资源
- [Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)
- [安装Yapi](https://www.jianshu.com/p/a97d2efb23c5)

## yapi内网部署

### 安装Docker
#### 1. 添加yum源。
```
# yum install epel-release –y
# yum clean all
# yum list
```

#### 2. 安装并运行Docker。
```
# yum install docker-io –y
# systemctl start docker
```

#### 3. 检查安装结果。
```zsh
docker info
```

### 使用 Docker 构建 Yapi
#### 1、创建 MongoDB 数据卷
```zsh
docker volume create mongo_data_yapi
```

#### 2、启动 MongoDB
```zsh
docker run -d --name mongo-yapi -v mongo_data_yapi:/data/db mongo
```

#### 3、获取 Yapi 镜像，版本信息可在 阿里云镜像仓库 查看
```zsh
docker pull registry.cn-hangzhou.aliyuncs.com/anoy/yapi
```

#### 4、初始化 Yapi 数据库索引及管理员账号
```zsh
docker run -it --rm \
  --link mongo-yapi:mongo \
  --entrypoint npm \
  --workdir /api/vendors \
  registry.cn-hangzhou.aliyuncs.com/anoy/yapi \
  run install-server
```
#### 5、启动 Yapi 服务
```zsh
docker run -d \
  --name yapi \
  --link mongo-yapi:mongo \
  --workdir /api/vendors \
  -p 3000:3000 \
  registry.cn-hangzhou.aliyuncs.com/anoy/yapi \
  server/app.js
```

#### 6、首次登录并修改密码
- 访问 http://localhost:3000 登录账号 admin@admin.com，密码 ymfe.org
- 进入个人中心，根据提示修改即可

#### 7、开始使用
官方文档已经比较详细了，可以直接[查看并学习](https://yapi.ymfe.org/documents/index.html)

### 其他相关操作
#### 关闭 Yapi
```zsh
docker stop yapi
```

#### 启动 Yapi
```zsh
docker start yapi
```

#### 升级 Yapi
```zsh
# 1、停止并删除旧版容器
docker rm -f yapi

# 2、获取最新镜像
docker pull registry.cn-hangzhou.aliyuncs.com/anoy/yapi

# 3、启动新容器
docker run -d \
  --name yapi \
  --link mongo-yapi:mongo \
  --workdir /api/vendors \
  -p 3000:3000 \
  registry.cn-hangzhou.aliyuncs.com/anoy/yapi \
  server/app.js
```