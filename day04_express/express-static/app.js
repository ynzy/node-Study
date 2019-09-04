const express = require('express')

const app = express();

// *当以/public/开头的时候, 去./public/ 目录中查找对应的资源
app.use('/public/',express.static('./public/'))

//* 当省略第一个参数的时候,则可以通过 省略/public的方式来访问
// app.use(express.static('./public/'))

//* 必须是 /a/public 目录中的资源具体路径
// app.use('/a/',express.static('./public/'))



app.get('/',(req,res)=> {
  res.send('hello world')
})

app.listen('3000',()=> {
  console.log('app runing');
  
})

