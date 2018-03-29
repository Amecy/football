# TXFootball

> 天下足球 （以 gitlab 上面的项目为准）

### 文档：
#### [点击跳转](https://github.com/Amecy/football/blob/master/DOCUMENT.md)

### 技术栈

#### 前端 

- es6 
- vue2 
- vue-router2 
- axios 
- better-scroll 
- vue-lazyload 
- stylus 


#### 后端：
> 通过webpack 设置HTTP代理的方式请求api获取数据



#### 安装与运行

```
git clone https://gitlab.com/Amecy/football.git

cd football

npm install（建议使用淘宝镜像cnpm）

npm run dev //服务端运行 访问 http://localhost:8080

npm run build 项目打包 


运行打包后代码

将server.js复制到dist文件夹下 

cd dist

node server.js  访问 http://localhost:8060
（确保已经安装node环境：npm i http-server -g ）

