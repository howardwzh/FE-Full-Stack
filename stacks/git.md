[Back](../README.md)
#Git

#目录

- [clone](#clone)
- [add](#add)
- [commit](#commit)
- [log](#log)
- [branch](#branch)
- [remote](#remote)
- [push](#push)
- [checkout](#checkout)
- [diff](#diff)
- [show](#show)
- [reset](#reset)
- [stash](#stash)
- [revert](#revert)
- [还原本地改动](#%E8%BF%98%E5%8E%9F%E6%9C%AC%E5%9C%B0%E6%94%B9%E5%8A%A8)
- [忽略](#%E5%BF%BD%E7%95%A5)
- [tag](#tag)
- [找回已删除的commit](#%E6%89%BE%E5%9B%9E%E5%B7%B2%E5%88%A0%E9%99%A4%E7%9A%84commit)
- [设置代理](#%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86)
- [小贴士](#%E5%B0%8F%E8%B4%B4%E5%A3%AB)
    - [调出内建图形化界面](#%E8%B0%83%E5%87%BA%E5%86%85%E5%BB%BA%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2)
    - [配置显示log历史的格式，下方配置每条commit将一行显示](#%E9%85%8D%E7%BD%AE%E6%98%BE%E7%A4%BAlog%E5%8E%86%E5%8F%B2%E7%9A%84%E6%A0%BC%E5%BC%8F%E4%B8%8B%E6%96%B9%E9%85%8D%E7%BD%AE%E6%AF%8F%E6%9D%A1commit%E5%B0%86%E4%B8%80%E8%A1%8C%E6%98%BE%E7%A4%BA)
    - [免密pull/push](#%E5%85%8D%E5%AF%86pullpush)
        - [Mac设置credential.helper](#mac%E8%AE%BE%E7%BD%AEcredentialhelper)
        - [ssh](#ssh)
    - [查看所有配置项和文件位置](#%E6%9F%A5%E7%9C%8B%E6%89%80%E6%9C%89%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%92%8C%E6%96%87%E4%BB%B6%E4%BD%8D%E7%BD%AE)
- [常见问题](#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- [参考](#%E5%8F%82%E8%80%83)


#正文
<!--  -->
### clone

本地仓库的克隆
```
git clone /path/to/repository
```

如果是远端服务器
```
git clone https://username:password@github.com/howardwzh/tips.git
```

如果还想 **指定分支** ？
```
git clone -b branchName https://username:password@github.com/howardwzh/tips.git
```
<!--  -->
### add

添加
```
git add path/to/file
```

添加多个
```
git add path/to/fileName1 path/to/fileName2
```

添加当前目录下所有[甚至包含删掉的文件]
```
git add . [--a]
```
<!--  -->
### commit

提交
```
git commit -m "代码提交描述信息"
```
提交到了 HEAD，但是还没 `push` 到远端仓库


如果想 **修改** 前一次提交信息
```
git commit --amend
```
此时会切换到vi编辑器，完成后保存退出： `Esc` -> `Shift+:` -> 输入`wq` -> `Enter`


如果想 `add + commit` 一起来
```
git commit -m "commit something" /path/of/file /path/of/file
```
<!--  -->

### log

列出 当前/所有 branch所有提交
```
git log

or

git log --all
```

列出提交描述中含有特定message的所有提交
```
git log --grep='some message'
```

如果想同时显示出相应的动作（commit/cherry-pick...）
```
git log --walk-reflogs --grep-reflog='some message'
```
可为是否cherry-pick了所有commits提供参考

列出某个 提交者 的所有commits
```
git log --author='howard'
```

列出某个时间区间的提交记录
```
git log --after="2014-7-1" --before="2014-7-4"
```

### branch
修改本地分支名字
```
git branch -m <oldname> <newname>
```
修改当前
```
git branch -m <newname>
```

将当前分支关联到指定的远程分支
```
git branch -u origin/branch_name
```

新建分支并关联到指定的远程分支
```
git branch new_branch -u origin/branch_name
```


<!--  -->
### remote

如果之前没有关联远程库，现在想关联起来(统一采用带 `username:password@` 的写法)
```
git remote add origin https://username:password@github.com/howardwzh/tips.git
```
提交到了 HEAD，但是还没 `push` 到远端仓库


如果想删除关联
```
git remote rm remoteName
```


如果想修改远程库的url
```
git remote set-url origin newURL
```


reset remote url
```
git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git

or

git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```

### push

当本地分支与远程分支 **名称一样** 时，可以直接`push`
```
git push origin
```

**名称不一样** 时
```
git push origin localbranch:remoteName
```


如果不想产生merge信息，先不commit,直接pull下来代码，再add->commit
```
git pull ...
    |
git add ...
    |
git commit ...
    |
git push ...
```


但是pull的时候提示有冲突呢？
```
git pull ...
    | 提示冲突了
git stash
    |
git pull ...
    |
git stash pop
    | remove conflicts
git add ...
    |
git commit ...
    |
git push ...
```


### checkout

直接创建分支
```
git branch newBranchName
```

创建分支并切换过去
```
git checkout -b newBranchName
```
**注意：**切换前最好确定已经提交本分支修改内容，否则会带到另一分支去，容易造成混乱(除非是有意为之)

创建关联远程remote的本地分支，并切换过去
```
git checkout --track -b newBranchName origin/branch
```


分支间切换
```
git checkout branchName
```
删除分支，**注意：**不能删除本身所在分支，此时需要先切换到其它分支才能删除


### diff

比较两个分支 **所有文件** 差异
```
git diff localBranchA localBranchB -- . // 打印差异
git diff localBranchA localBranchB -- . >diff.txt // 打印差异到指定文件
git diff --name-only localBranchA localBranchB -- . // 只打印差异文件名
```

比较两个分支 **指定文件** 的差异
```
git diff localBranchA localBranchB -- filePath // 指定文件
git diff localBranchA localBranchB -- “**.js” // 正则指定若干文件

git diff localBranchA localBranchB -- . ":(exclude)filePath" // 排除指定文件
git diff localBranchA localBranchB -- . ":(exclude)**.js" // 正则排除指定文件
```

比较本地 **所有文件** 与HEAD上的差异
```
git diff .
```

比较本地 **指定文件** 与HEAD上的差异
```
git diff filePath
```

### show

查看最近一次提交所修改的文件内容
```
git show
```

只查看最近一次提交所修改的文件名
```
git show --name-only
```

### reset

文件从 `add` 中取出，保留修改文件
```
git reset HEAD~1
```

文件还保留在 `add` 中，同时保留修改文件
```
git reset --soft HEAD~1
```

文件不保留在 `add` 中，也不保留修改的文件，完全回到之前提交状态
```
git reset --hard HEAD~1
```

### stash

临时存储
```
git stash

or

git stash save 名称
```

查看差异
```
# 数字对应stash序号，从0开始
git stash show 0 -p

or

# 查看所有缓存差异
git list -p

```

取出存储
```shell
# 取出最近一次存储，并删除stash对应堆栈
git stash pop

# 取出某次存储，并删除stash对应堆栈
git stash pop 1

# apply类似，只是 **不删除** stash对应堆栈
git stash apply

or

git stash apply 1
```

### revert

将某次提交的修改回滚到修改之前
```
git revert commitId
```

### 还原本地改动

**还没** `add`或者`commit`的话
```
git checkout -- fileName
```

**已经** `add`或者`commit`的话
```
git reset --hard commitId

#add
git reset HEAD
    |
git checkout -- fileName

#commit
git reset HEAD~1
    |
git checkout -- fileName
```


### 忽略

**未加入**版本库的文件可以用下面的方法，绝对路径
```
git config --global core.excludesfile d:/path/of/self.gitignore
```

然后在 `self.gitignore` 内加入想忽略的文件路径，可相对`self.gitigore`的路径
```
yougola-pc-seoweb
yougola-pc.iml
self.gitignore
```

**已加入**版本库的文件可以用下面的方法
```
git update-index --assume-unchanged path/of/file
```

如果想**取消忽略**该文件
```
git update-index --no-assume-unchanged path/of/file
```


### tag

创建1.0.0_tag标签(以下均以1.0.0_tag为例)
```
git tag 1.0.0_tag commitId
```

删除tag
```
git tag -d 1.0.0_tag
```

push tag
```
git push origin 1.0.0_tag
```

拉出某tag为新分支
```
git checkout -b new-branch 1.0.0_tag
```

### 找回已删除的commit

`git reflog` 列出所有commits历史记录（包括已删除的）

找到相应删除的commitId后

```
git merge xxxxxxxx

or

git cherry-pick xxxxxxxx

or

git reset --hard xxxxxxxx
```

### 设置代理

```shell
git config --global http.proxy http://127.0.0.1:1080

git config --global https.proxy http://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy
```

```
vim ~/.zshrc

# insert
alias proxy='export all_proxy=http://127.0.0.1:1087'
alias unproxy='unset all_proxy'
# insert end
:wq

# start these config
source ~/.zshrc

# ok, if need to turn over wall, and use git pull some codes
proxy

# if need to stop
unproxy

```

ps: global 可换成 local，只设置当前的git仓库采用代理

### 小贴士

#### 调出内建图形化界面
```
gitk
```

#### 配置显示log历史的格式，下方配置每条commit将一行显示
```
# 当前git仓库
git config format.pretty oneline

# 全局git仓库
git config --global format.pretty oneline
```

### 免密pull/push
#### Mac设置credential.helper
在Mac可以使用与钥匙链连接的认证助手，**第一次还是需要输入username/password的**
```
git config --global credential.helper osxkeychain
```
PS: Windows可以使用[git-credential-winstore](https://github.com/Microsoft/Git-Credential-Manager-for-Windows)
#### 直接在config中设置https
安全性差一些，**容易泄漏username/password**
```
...
[remote "origin"]
    url = https://username:password@github.com/howardwzh/FE-Full-Stack.git
    fetch = +refs/heads/*:refs/remotes/origin/*
...
```
#### SSH
- [GIT免密登录（mac系统）](https://www.jianshu.com/p/159243702063)
- [mac 下使用多个 git 账户配置](https://blog.csdn.net/Cuckoo_sound/article/details/79888207)

- 如果你还没有克隆你的仓库，那你直接使用ssh协议用法：git@github.com:yourusername/yourrepositoryname克隆就行了
- 如果已经使用https协议克隆了，那么按照如下方法更改协议： git remote set-url origin git@github.com:yourusername/yourrepositoryname.git

### 查看所有配置项和文件位置
```
git config --list --show-origin
```
## 常见问题

---
```shell
error: RPC failed; curl 18 transfer closed with outstanding read data remaining 
fatal: The remote end hung up unexpectedly 
fatal: early EOF 
fatal: index-pack failed
```

原因说明:
我们的项目由于时代久远，所以导致整个项目比较复杂庞大。出现这种错误，就是因为curl的postBuffer默认值太小的原因，重新在终端配置一下这个值就可以了。
解决方法：
```
git config –-global http.postBuffer 524288000
```
524288000代表B，524288000B也就是500MB。这个值得大小，可以根据项目酌情设置。
也可以用如下命令查看是否配置成功：
```
git config –list
```
---


### 参考
- [猴子都能懂的GIT](https://backlog.com/git-tutorial/cn/stepup/stepup1_1.html)
- [高质量的Git中文教程](https://github.com/geeeeeeeeek/git-recipes)
- [代码合并：Merge、Rebase 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9)