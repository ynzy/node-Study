var http = require('http')

// 1. 创建Server
var server = http.createServer()
// 2. 监听 request 请求事件,设置请求处理函数
server.on('request',function (req, res) {
  console.log('收到请求了请求路径是:'+ req.url);
  console.log('请求我的客户端的地址端口号是:',req.socket.remoteAddress, req.socket.remotePort);
  
  // 直接end的同时发送响应数据
  // res.end('hello world')
  /**
   * 根据不同的请求路径发送不同的响应结果
   * 1. 获取请求路径
        req.url 获取到的是端口号之后的那一部分路径
        也就是说所有的url都是以 / 开头的
   * 2. 判断路径处理响应
   */
  var url = req.url
  // if(url === '/') {
  //   res.end('index page')
  // } else if (url === '/login') {
  //   res.end('login page')
  // } else {
  //   res.end('404 Not Found')
  // }
  if(url === '/products') {
    let products = [
      {
        name: '苹果',
        price: 9000
      },{
        name: '华为',
        price: 5675456
      },{
        name: 'vivo',
        price: 2344
      },{
        name: '三星',
        price: 23432
      },
    ]
    // 响应内容只能是二进制数据或者字符串(数字,对象,数组,布尔值都不行)
    res.end(JSON.stringify(products))

  }
})

// 3. 绑定端口号,启动服务
server.listen(3000,function () {
  console.log('服务器启动成功,可以访问了');
})
