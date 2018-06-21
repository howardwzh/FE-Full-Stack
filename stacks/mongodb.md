## Mongodb

1. 根据系统类型[下载](https://www.mongodb.com/download-center#community)即可
2. 直接按步骤安装
3. 设置全局path到bin目录，如：`F:\Software\MongoDB\Server\3.4\bin`
4. 建立数据存放目录,如：`F:\Software\MongoDB\data`
5. 启动mongdb服务,输入`mongod.exe --dbpath=F:\Software\MongoDB\data`
6. 另起一个控制台，输入mongo, 如下表示正常启动
```sh
C:\Users\Administrator>mongo
MongoDB shell version v3.4.6
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.6
```