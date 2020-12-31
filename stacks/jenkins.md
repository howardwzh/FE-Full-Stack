## 参考资料
- [Docker系列之Jenkins自动化部署](https://juejin.im/entry/5958f544f265da6c317d9c8f)
- [实战笔记：Jenkins打造强大的前端自动化工作流](https://juejin.im/post/5ad1980e6fb9a028c42ea1be)
- [macOS Jenkins安装&配置](https://www.jianshu.com/p/9dc3b45fbbec)

## 安装/启动
1. [下载javaSDK(jdk)](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)，双击安装即可
2. [下载jenkins.war](https://jenkins.io/download/)
3. 执行下面命令
```
java -jar jenkins.war –-httpPort=8866
```
## 插件安装
> 路径：`系统管理`-`插件管理`-`可用插件`-`搜索`
- 初始化时，安装推荐插件
- nvm wrapper（方便**切换nodejs版本**，windows安装麻烦，不用也行，自行安装一个**新的稳定的nodejs**）
- [Publish Over SSH](#配置SSH上传)
- [Shared Workspace](#配置Shared_Workspace)
- [Generic Webhook Trigger Plugin](#配置git触发钩子)(不用自动触发，可以不安装)
 
## 搭建前端自动化工程（jenkins）

### step1-选择Shared Workspace（推荐，共享以减少重复冗余）
1. 直接选择配置好的对应[分享工作区](#配置Shared_Workspace)

### step2-配置git项目地址
1. 项目地址，如：`https://github.com/howardwzh/my-project.git`
2. 用户名/密码
3. **注意配置对应的分支**

### step3-配置shell命令(执行shell)
```zsh
npm install
npm run test
cd dist
tar -zcvf dist.tar.gz *
```
### step4-发布后执行发布命令(Send build artifacts over SSH)
1. Name, 选择事先配置好的[SSH Server](#配置SSH_Server)
2. Transfers, 配置上传参数
  1. Source files（要上传的目标文件，一般是构建shell时打包好的），如：`dist/dist.tar.gz`
  2. Remove prefix（要移除的路径前缀，否则上传到目标服务器会创建额外目录）
  3. Remote directory（远程目录，以SSH Server设置的目录为相对路径）
  4. Exec command（执行的命令，此时是在目标服务器了）如下：
```zsh
cd /var/www/mobile // 进入上传到的目录
tar -zxvf dist.tar.gz // 将文件解压出来
rm -rf dist.tar.gz // 删除压缩包
```

## 插件配置
### 配置Shared_Workspace
> 路径：`jenkins配置-系统管理-系统设置-Workspace Sharing`
1. Name，设置名字，好区分即可，一般可以用 **git仓库名**
2. Repository URL, 仓库地址，形如：`https://github.com/vuejs/vue.git`
### 配置git触发钩子
1. 添加触发器，如：向远程仓库提交的是dev分支的代码，就执行开发环境的代码构建部署工作
2. 登录到对应到git项目中，配置`webhooks`
  1. `URL`格式为 `http://<User ID>:<API Token>@<Jenkins IP地址>:端口/generic-webhook-trigger/invoke`, 其中`userid`和`api token`在`jenkins`的**系统管理-管理用户-admin-设置**里
  2. 选择触发动作，默认是`push`
3. 测试钩子，如果配置是成功的，你的Jenkins左侧栏构建执行状态里将会出现一个任务

### 配置SSH上传
#### 1. jenkins所在服务器创建ssh（～/.ssh）
```zsh
ssh-keygen -t rsa -C "howard@mac.com" # 一直enter下去，也可以在 Enter passphrase 输入密码，自己记住
```
> 这一步可获得
> - id_rsa (私钥)
> - id_rsa.pub (公钥)

#### 2. 配置要上传的目标服务器
- 将 **id_rsa.pub(公钥)** 内容复制到 `～/.ssh/authorized_keys` 即可

#### 3. 配置SSH_Server
> 路径：`jenkins配置-系统管理-系统设置-Publish Over SSH`
- Passphrase (上面步骤的密码)
- Path to key（私钥路径）/ Key（私钥内容），私钥二选一即可
- SSH Servers新增要上传的目标服务器
  - Name（名字，有区分度即可）
  - Hostname（一般填ip）
  - Username（登录用户名）
  - Remote Directory（默认初始目录，方便后续相对路径配置即可）
  - Test Configuration（测试是否连通，显示 **Success** 就通了）

### 常见问题
#### npm命令报错 npm: command not found
> 前提：服务器npm已经配置完成，并且服务器执行npm install没有问题

1. 查询系统环境变量： `echo $PATH`
```zsh
[root@localhost /]# echo $PATH
/home/software/jdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/git/bin:/usr/local/git/bin:/root/bin
```
2. 服务器的环境变量添加到Jenkins
位置：`【系统管理】->【系统设置】->【全局属性】->【环境变量】`
做如下配置：
```zsh
键: PATH
值: /home/software/jdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin:/usr/local/git/bin:/usr/local/git/bin:/root/bin
```