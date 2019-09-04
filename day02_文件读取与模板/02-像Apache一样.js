const http = require('http');
const fs = require('fs')
let server = http.createServer();
// Apache 服务器软件,默认有一个www目录,所有存放在www目录中的资源都可以通过网址来浏览
// 127.0.0.1:8080/a.txt
// 127.0.0.1:8080/index.html
// 127.0.0.1:8080/apple/login.html
const wwwDir = 'G:/www'

server.on('request', function (req, res) {
  let url = req.url;
  let filePath = '/index.html'
  if (url !== '/') {
    filePath = url
  }
  if(url === '/favicon.ico'){
    filePath = '/index.html'
  }
  // console.log(filePath, `${wwwDir}${filePath}`);
  fs.readFile(`${wwwDir}${filePath}`, (err, data) => {
    if (err) return res.end('404 Not Found')
    res.end(data)
  })
})

server.listen(3000, function () {
  console.log('running...');

})