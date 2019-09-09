# 博客系统

## 1. 起步
1. 安装相关依赖

```shell
yarn add express mongoose
```

2. 启动服务,开放公共资源

```js
const express = require('express')
const path = require('path')
const app = express()

const port = 3000;

//* 开放目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.get('/',(req,res)=> {
  res.send('hello world')
})

app.listen(port,()=> {
  console.log(`running at localhost:${3000}`);
})
```
## 2. 添加模板引擎
1. 安装依赖包:
```js
yarn add art-template express-art-template
```
2. 配置模板引擎
```js
//* 配置使用art-template模板引擎
// 第一个参数标识,当渲染以 .html 结尾的文件的时候,使用art-template模板引擎
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'))  // 默认就是 ./views目录, 可以不配置
```
3. 渲染html页面
```js
app.get('/',(req,res)=> {
  res.render('index.html',{
    title: '标题'
  })
})
```

4. 使用模板引擎布局layout公共页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>个人博客项目</title>
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
  {{block 'head'}}{{ /block}}
</head>

<body>
  {{include './header.html'}}
  <!-- 留个坑 -->
  {{block 'content'}}
  <h1>默认内容</h1>
  {{/block}}
  {{include './footer.html'}} 

  <script src="/node_modules/jquery/dist/jquery.min.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  {{block 'script'}}{{ /block}}
</body>
</html>
```

5. 在index页面使用

```js
<!-- 继承layout页面 -->
{{extend './layout.html'}}

{{block 'head'}} 
<style>
body {
  background: rgb(7, 150, 175);
}
</style>
{{/block}}

{{block 'content'}} 
<div>
  <h1>index 填写内容</h1>
</div>
{{/block}}

{{block 'script'}} 
<script>
window.alert('自己的js')
</script>
{{/block}}
```

