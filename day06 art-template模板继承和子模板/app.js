const express = require('express')
const path = require('path')
const app = express()

const port = 3000;

//* 开放目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//* 配置使用art-template模板引擎
// 第一个参数标识,当渲染以 .html 结尾的文件的时候,使用art-template模板引擎
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'))  // 默认就是 ./views目录

app.get('/',(req,res)=> {
  res.render('index.html',{
    title: '标题'
  })
})

app.listen(port,()=> {
  console.log(`running at localhost:${3000}`);
  
})