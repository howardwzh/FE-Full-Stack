## 参考资料
- [Nginx能为前端开发带来什么？](http://imweb.io/topic/56386972d12b230c26e1a17d)
- [前端工程师学习Nginx入门篇](http://cnt1992.xyz/2016/03/18/simple-intro-to-nginx/)
- [Centos下 Nginx安装与配置](https://www.jianshu.com/p/d5114a2a2052)
- [Nginx 容器教程](http://www.ruanyifeng.com/blog/2018/02/nginx-docker.html)
- [nginx配置location总结及rewrite规则写法](http://seanlook.com/2015/05/17/nginx-location-rewrite/)
- [nginx服务器安装及配置文件详解](http://seanlook.com/2015/05/17/nginx-install-and-config/)

## 配置不完全说明
### nginx.conf中
```conf
# user字段表明了Nginx服务是由哪个用户哪个群组来负责维护进程的，默认是nobody
# 我这里用了cainengtian用户，staff组来启动并维护进程
# 查看当前用户命令： whoami
# 查看当前用户所属组命令： groups ，当前用户可能有多个所属组，选第一个即可
user cainengtian staff;
# worker_processes字段表示Nginx服务占用的内核数量
# 为了充分利用服务器性能你可以直接写你本机最高内核
# 查看本机最高内核数量命令： sysctl -n hw.ncpu
worker_processes 4;
# error_log字段表示Nginx错误日志记录的位置
# 模式选择：debug/info/notice/warn/error/crit
# 上面模式从左到右记录的信息从最详细到最少
error_log  /usr/local/var/logs/nginx/error.log debug;
# Nginx执行的进程id,默认配置文件是注释了
# 如果上面worker_processes的数量大于1那Nginx就会启动多个进程
# 而发信号的时候需要知道要向哪个进程发信息，不同进程有不同的pid，所以写进文件发信号比较简单
# 你只需要手动创建，比如我下面的位置： touch /usr/local/var/run/nginx.pid
pid  /usr/local/var/run/nginx.pid;
events {
    # 每一个worker进程能并发处理的最大连接数
    # 当作为反向代理服务器，计算公式为： `worker_processes * worker_connections / 4`
    # 当作为HTTP服务器时，公式是除以2
    worker_connections  2048;
}
http {
    # 关闭错误页面的nginx版本数字，提高安全性
    server_tokens off;
    include       mime.types;
    default_type  application/octet-stream;
    # 日志记录格式，如果关闭了access_log可以注释掉这段
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                 '$status $body_bytes_sent "$http_referer" '
    #                '"$http_user_agent" "$http_x_forwarded_for"';
    # 关闭access_log可以让读取磁盘IO操作更快
    # 当然如果你在学习的过程中可以打开方便查看Nginx的访问日志
    access_log off;
    sendfile        on;
    # 在一个数据包里发送所有头文件，而不是一个接一个的发送
    tcp_nopush     on;
    # 不要缓存
    tcp_nodelay on;
    keepalive_timeout  65;
    gzip  on;
    client_max_body_size 10m;
    client_body_buffer_size 128k;
    # 关于下面这段在后面紧接着来谈！
    include /usr/local/etc/nginx/sites-enabled/*;
}
```
### 上面include的文件中
```conf
server {
    # Nginx监听端口号
    listen       80;
    # 服务器的名字，默认为localhost，你也可以写成aotu.jd.com，这样子就可以通过aotu.jd.com来访问
    server_name  localhost;
    # 代码放置的根目录
    root /var/www/;
    # 编码
    charset utf-8;    
    location / {
        # index字段声明了解析的后缀名的先后顺序
        # 下面匹配到/的时候默认找后缀名为php的文件，找不到再找html，再找不到就找htm
        index index.php index.html index.htm;
        # 自动索引
        autoindex on;
        # 这里引入了解析PHP的东西
        include /usr/local/etc/nginx/conf.d/php-fpm;
    }    
    # 404页面跳转到404.html，相对于上面的root目录
    error_page  404              /404.html;
    # 403页面跳转到403.html，相对于上面的root目录
    error_page  403              /403.html;
    # 50x页面跳转到50x.html
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```