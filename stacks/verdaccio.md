## 参考资源
- [verdaccio github](https://github.com/verdaccio/verdaccio)
- [使用verdaccio搭建npm私有仓库](https://juejin.im/entry/5c64db9851882562851b328f)

## 实践笔记
### Step0: 依赖
#### nodejs
- windows直接安装exe
- linux `tar -xvf node-v8.9.1-linux-x64.tar.gz`

#### pm2
```zsh
npm install -g pm2 --unsafe-perm
```

### Step1: 安装
```zsh
# Install with npm:
npm install -g verdaccio --unsafe-perm
```

### Step2: 启动
```zsh
# 1. 修改配置：vim /root/.config/verdaccio/config.yaml
listen: 0.0.0.0:4873                    # listen on all addresses
# 2. 启动
verdaccio
or
pm2 start verdaccio
```
PS：启动后可以直接打开 [http://localhost:4873/](http://localhost:4873/)，方便查看私有的npm包

### Step3: 设置 registry
```zsh
$ npm set registry http://localhost:4873/
# if you use HTTPS, add an appropriate CA information
# ("null" means get CA list from OS)
$ npm set ca null
```

### Step4: 创建账号
```zsh
# 输入命令，根据引导填写即可
npm adduser --registry http://localhost:4873
```

### Step5: 发布npm包/撤销发布包
```zsh
# 进入要发布的包
cd path/to/package

# 初始化
npm init

# 登录，已经登录(adduser)可以不用
npm login --registry http://localhost:4873

# 发布
npm publish --registry http://localhost:4873
or
npm publish --access public

# 撤销发布包
npm unpublish 包名
```

### Step6（可选）: 更新
```zsh
# patch：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
# minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
# major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0
npm version patch

npm publish
```
