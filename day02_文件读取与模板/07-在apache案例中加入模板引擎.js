const http = require('http');
const fs = require('fs')
const template = require('art-template')
let server = http.createServer();

const wwwDir = 'E:/www'

server.on('request', function (req, res) {
  let url = req.url;
  fs.readFile('./template-apache.html','utf8', (err, data) => {
    if (err) return res.end('404 Not Found')
    /**
     * 1. 如何得到wwwDir 目录列表中的文件名和目录名
     *    fs.readir
     * 2. 如何将得到的文件名和目录名替换到templa.html中
     *  2.1 在template.html 中需要替换的位置预留一个特殊的标记,(就像以前的模板引擎一样)
     *  2.2 根据files生成需要的Html内容
     *    模板引擎
     * 只要做了这两件事,这个问题就解决了
     */
    fs.readdir(wwwDir,'utf8', (err, files) => {
      if (err) return res.end('Can not find WWW dir.')
      
      // 这里只需要使用模板引擎解析替换data中的模板字符串就可以了
      // 数据时files
      // 然后去template.html 文件中编写你的模板语法就可以了
      var htmlStr = template.render(data,{
        title:'目录',
        files
      })
      //* 3 发送解析替换过后的响应数据
      res.end(htmlStr)
    })


  })
})

server.listen(3000, function () {
  console.log('running...');

})