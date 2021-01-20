## 参考/资源
- [如何解决类似 curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused 的问题](https://github.com/hawtim/blog/issues/10)
- [免费Shadowsocks/SS帐号分享网站推荐](https://baiyunju.cc/4951)
- [update Homebrew 太慢，更换Homebrew的更新源](https://juejin.cn/post/6844904084776960008)
## [Shadowsocks](https://portal.shadowsocks.la/)

**关键字：PAC、代理、翻墙、全局模式**
> 轻量级科学上网姿势，改变您的生活体验！
> 相信大家都有无法访问国外网站的经历，最近寻到一个翻墙好工具，与大家分享一下


### Step 1: [订购链接](https://portal.shadowsocks.la/cart.php)

我选用的是普通版，主要考虑到暂时只在一个端使用，而且也相对便宜些，1年100多还能承受：）


### Step 2: [下载客户端](https://portal.shadowsocks.la/downloads.php)

按照自己的系统情况，下载了：**Windows 客户端 .NET Framework 4.0 版**


### Step 3: 添加服务器

- 运行起来，先不要填服务器信息，直接关掉窗口
- 进到网页上的自己的账户，点击进入购买的产品信息里，底部可使用的服务器列表
- 点击其中一列右侧的二维码按钮，会弹出相应的二维码
- 再右键点击客户端小图标，选择 *服务器* -> *扫描屏幕上的二维码*，即可添加上了
- 按照上面两步，把其它的全都添加上

经过上面的步骤，理论上已经可以访问 **谷歌** 了：）


### Step 4: 优化浏览器配置

> Why: 因为只有某些网站才要代理去翻墙，比如：谷歌、Fackbook、youtobe等等，
> 如果加了代理可能反而访问变慢了。
> 
> So: 这个配置就是：如果网站不用代理就能访问那就不用，
> 只对 **相应的网站** 使用代理就好。

- [下载浏览器插件](https://portal.shadowsocks.la/downloads.php?action=displaycat&catid=2)，我用的是谷歌，所以选用了 **Proxy SwitchyOmega**
- 下载到本地，然后打开谷歌扩展界面，拖进去安装即可
- 然后在右上角就有个 **“大写的O”**，左键点击图标，再点击 **选项** 进去
- 可以在里面配置“自动切换”规则，如果不想研究了，可以直接下载 **[常见配置](./assets/shadowsocks/OmegaOptions.bak)**
- 然后在 **选项** 中导入该配置文件
- 注意情景模式 **GFWed** 里的 **代理端口**，一定要和你所选用的服务器端口一致
- 查看方式就是右键右下角小图标，**服务器 -> 编辑服务器**，然后在界面右下角就能看到了
- 此时点击浏览器右上角的 **“大写的O”**，选择 **自动切换** 即可
- 最后可以右键右下角小图标，把 **启用系统代理** 勾选去掉了

PS：如果有在非浏览器下载“某些国外”站点场景时，要把 **启用系统代理** 勾上，并用选择 **系统代理模式 -> 全局模式**


### Step 5: mac终端中设置代理翻墙（可选）
1. 打开终端(默认你使用了zsh/oh my zsh)
2. 执行 `vim ~/.zshrc`
3. 在配置中加入下面的别名设置，保存退出(:wq)
```
alias proxy="export all_proxy=http://127.0.0.1:1087"
alias unproxy="unset all_proxy"
```
4. 启用执行 `source ~/.zshrc`

> 这里还有其它的配置方法，[马上去看](https://github.com/Quinton/blog/issues/2)


## update Homebrew 太慢，更换Homebrew的更新源
### 替换更新源
```zsh
# 替换brew.git:
$ cd "$(brew --repo)"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
# 中国科大:
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# 清华大学:
$ git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

# 替换homebrew-bottles:
# 中国科大:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
# 清华大学:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 应用生效:
$ brew update
```
### 如果你之前折腾过不少导致你的Homebrew有点问题，那么可以尝试使用如下方案：
```zsh
# 诊断Homebrew的问题:
$ brew doctor

# 重置brew.git设置:
$ cd "$(brew --repo)"
$ git fetch
$ git reset --hard origin/master

# homebrew-core.git同理:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git fetch
$ git reset --hard origin/master

# 应用生效:
$ brew update
```

### 重置更新源 某些时候也有换回官方源的需求
```zsh
# 重置brew.git:
$ cd "$(brew --repo)"
$ git remote set-url origin https://github.com/Homebrew/brew.git

# 重置homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

### 后记
完成更新源的更换后，我们可以使用 brew upgrade将现有的软件进行更新至最新版本，这样便能很直接的看出速度上的变化了。最后不要忘记 brew cleanup将旧有的软件安装包进行清理

## 解决 raw.githubusercontent.com port 443 一类问题
1. 打开 https://www.ipaddress.com/ 输入访问不了的域名, 查询之后可以获得 **正确的 IP 地址**
2. 在本机的 host 文件中添加，建议使用 **switchhosts** 方便 host 管理
```host
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
```
如上配置, 添加以上几条 host 配置，页面的图片展示就正常了，homebrew 也能装了，nvm 也行动灵活了