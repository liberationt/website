### 1.上传Dockerfile、nginx.conf、webpack打包后生成的dist文件夹到Linux服务器
```
文件目录结构为:
drwxr-xr-x. 6 root root  88 Sep 18 15:58 dist
-rw-r--r--. 1 root root 333 Sep 13 15:11 Dockerfile
-rw-r--r--. 1 root root 939 Sep 13 15:11 nginx.conf
```

### 2.构建Docker镜像
```
docker build -t nginx88 .
```

## 3.启动构建好的Docker镜像即可
```
docker run --name nginx88 -d -p 88:80 nginx88  
```