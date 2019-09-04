/**
 * 0. 安装 yarn add express
 * 1. 引包
 * 2. 创建你的服务器应用程序,也就是原来的http.createServer
 */
const express = require('express')

const app = express();


/**
 *! 公开指定目录
 * 只要这样做了,你就可以直接通过 /public/xx的方式访问public目录中的所有资源了
 */
app.use('/public/',express.static('./public/'))
app.use('/static/',express.static('./static/'))

/**
 *! 获取路径执行回调
 */
// 当服务器收到get请求/的时候,执行回调处理函数
app.get('/', (req, res) => {
  //* 在express中可以直接req.query 来获取查询字符串参数
  console.log(req.query);
  
  res.send('hello express!')
})
app.get('/about', (req, res) => {
  res.send('你好,我是express!')
})
app.get('/pinglun',(req,res) => {
  //* 在express中使用模板引擎有更好的方式: res.render('文件名', {模板对象})
  // 可以自己尝试去看art-template官方文档:如何让art-template结合express来使用

})


app.listen(3000, () => {
  console.log(`app is running at port 3000`);
})


