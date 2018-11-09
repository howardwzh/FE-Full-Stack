## 参考资料
- [Docker 教程](http://www.runoob.com/docker/docker-tutorial.html)
- [Docker — 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/)

## 常用命令

### 数据卷
```zsh
# 创建一个数据卷
docker volume create my-vol

# 查看所有的 数据卷
docker volume ls

# 查看指定 数据卷 的信息
docker volume inspect my-vol

# 查看 web 容器的信息
docker inspect web

# 删除数据卷
docker volume rm my-vol

# 清理无主的数据卷
docker volume prune
```

```zsh
# 显示单个容器ip
docker inspect --format '{{ .NetworkSettings.IPAddress }}' <container-ID> 

# 显示所有容器ip
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
```

