/**
 * 1. 结合fs 发送文件中的数据
 * 2. Content-Type
 *  http://tool.oschina.net/commons
 * 不同的资源对应的 Content-Type 是不一样的
 * 图片不需要指定编码
 * 一般只为字符数据才指定字符编码格式
 */

var http = require('http')
var fs = require('fs')
var server = http.createServer();

server.on('request',function (req,res) {
  var url = req.url;
  if(url === '/') {
    fs.readFile('./resource/index.html',function (err,data) {
      if(err) {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.end('文件读取失败,请稍后重试')
      }else {
        // data 默认是二进制数据,可以通过 .toString转为咱们识别的字符串
        // res.end()  支持两种数据类型: 二进制,字符串
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(data)
      }
    })
  }else if (url === '/image') {
    // url : 统一资源定位符
    // 一个 url 最终其实是要对应到一个资源
    fs.readFile('./resource/img.jpg',function (err,data) {
      if(err) {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.end('文件读取失败,请稍后重试')
      }else {
        // data 默认是二进制数据,可以通过 .toString转为咱们识别的字符串
        // res.end()  支持两种数据类型: 二进制,字符串
        // 图片就不需要指定编码了,因为我们常说的编码一般指的是:字符编码
        res.setHeader('Content-Type','image/jpeg')
        res.end(data)
      }
    })
  }
})

server.listen(3000,function () {
  console.log('server is runing...');
})