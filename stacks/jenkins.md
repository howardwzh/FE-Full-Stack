## 参考资料
- [Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)
- [Docker系列之Jenkins自动化部署](https://juejin.im/entry/5958f544f265da6c317d9c8f)
- [实战笔记：Jenkins打造强大的前端自动化工作流](https://juejin.im/post/5ad1980e6fb9a028c42ea1be)
- [macOS Jenkins安装&配置](https://www.jianshu.com/p/9dc3b45fbbec)

## 常用命令
```zsh
# 显示单个容器ip
docker inspect --format '{{ .NetworkSettings.IPAddress }}' <container-ID> 

# 显示所有容器ip
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```

## ssh配置
### 生成
```zsh
ssh-keygen -t rsa -C "howard@mac.com" # 一直enter下去，也可以在 Enter passphrase 输入密码，自己记住
```

## 搭建前端自动化工程（jenkins）
### 安装/启动（略）
### 插件安装
### 工程搭建
#### step1-配置git项目地址
1. 项目地址，如：`https://github.com/howardwzh/my-project.git`
2. 用户名/密码
#### step2-配置git触发钩子（可选）
1. 安装，`系统管理`-`插件管理`-`可用插件`-搜索`Generic Webhook Trigger Plugin`-选中安装
2. 添加触发器，如：向远程仓库提交的是dev分支的代码，就执行开发环境的代码构建部署工作
3. 登录到对应到git项目中，配置`webhooks`
  1. `URL`格式为 `http://<User ID>:<API Token>@<Jenkins IP地址>:端口/generic-webhook-trigger/invoke`, 其中`userid`和`api token`在`jenkins`的**系统管理-管理用户-admin-设置**里
  2. 选择触发动作，默认是`push`
4. 测试钩子，如果配置是成功的，你的Jenkins左侧栏构建执行状态里将会出现一个任务

#### step3-配置shell命令
```zsh
npm install
npm run build
```
#### step4-配置上传发布设置
#### step5-发布后执行的命令