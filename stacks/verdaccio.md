## 参考资源
- [verdaccio github](https://github.com/verdaccio/verdaccio)
- [如何发布自己的NPM包（模块）？](https://juejin.im/post/5b95c2ed6fb9a05cd67699d1)

## 实践笔记

### Step1: 安装
```zsh
# Install with npm:
npm install --global verdaccio

# Install with yarn:
yarn global add verdaccio
```

### Step2: 启动
```zsh
verdaccio
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

### Step5: 发布npm包
```zsh
# 进入要发布的包
cd path/to/package

# 初始化
npm init

# 登录，已经登录(adduser)可以不用
npm login --registry http://localhost:4873

# 发布
npm publish --registry http://localhost:4873
```

### Step6（可选）: 更新
```zsh
# patch：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
# minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
# major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0
npm version patch

npm publish
```
