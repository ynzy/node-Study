// app application 应用程序
// 把当前模块所有的依赖项都声明在文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中
// 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
// / index.html
// /public 整个 public 目录中的资源都允许被访问
// 前后端融会贯通了，为所欲为

const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url')

let comments = [{
  name: '张三',
  message: '今天天气不错',
  dateTime: '2018-08-26'
}]
/**
 * http://localhost:3000/pinglun?name=65456&message=546456456
 * 对于这种表单提交的请求路径,由于其中具有用户动态填写的内容
 * 所以你不可能通过去判断完整的url路径来处理这个请求
 * 结论: 对于我们来讲,其实只需要判定,如果你请求路径是 /pinglun 的时候,那我就认为你提交表单的请求过来了
 */

http.createServer((req, res) => {
    // 使用 url.parse 方法将路径解析为一个方便操作的对象,第二个参数为true,便是直接将查询字符串转为一个对象(通过query属性来访问)
    let parseObj = url.parse(req.url, true);
    // 单独获取不包含查询字符串的路径部分(改路径不包含?之后的内容)
    let pathName = parseObj.pathname;
    if (pathName === '/') {
      fs.readFile('./views/index.html', 'utf8', (err, data) => {
        if (err) return res.end('404 Not Found..')
        let htmlStr = template.render(data, {
          comments
        })
        res.end(htmlStr)
      })
    } else if (pathName === '/post') {
      fs.readFile('./views/post.html', (err, data) => {
        if (err) return res.end('404 Not Found..')
        res.end(data)
      })
    } else if (pathName.indexOf('/public/') === 0) {
      // /public/css/main.css
      // /public/js/main.js
      // /public/lib/jquery.js
      /**
       * 统一处理
       *  如果请求路径是已/public/开头的,则我认为你要获取public中的某个资源
       *  所以我们就直接可以吧请求路径当做文件路径来直接读取
       */
      fs.readFile('.' + pathName, (err, data) => {
        if (err) return res.end('404 Not Found..')
        res.end(data)
      })

    } else if (pathName === '/pinglun') {
      // 注意: 这个时候无论 /pinglun?xx之后是什么,都不需要担心,因为我的pathName是不包含?之后的内容
      // res.end(JSON.stringify(parseObj.query))
      /**
       * 1. 获取表单提交的数据,parseObj.query
       * 2. 当前日期添加到数据对象中,然后存储到数组中
       * 3. 让用户重定向跳转到首页
       *    当用户重新请求 / 的时候,我数组中的数据已经发生了变化,
       *    所以用户看到的页面也要发生变化
       */
      let comment = parseObj.query
      comment.dateTime = '2019-11-2 17:11:22'
      comments.unshift(comment)

      
      /**
       *! 如果通过服务器让客户端重定向
       * 1. 状态码设置为302临时重定向
       *    statusCode
       * 2. 在响应头中通过Location告诉客户端往哪重定向
       *    setHeader
       * 如果客户端发现服务端响应的状态码是302,就会自动去响应头中找location,然后对改地址发起新的请求
       * 所以你就能看到客户端自动跳转了
       */
      res.statusCode = 302;
      res.setHeader('Location','/')
      res.end();
    } else {
      // 其他的都处理成404,找不到
      fs.readFile('./views/404.html', (err, data) => {
        if (err) return res.end('404 Not Found..')
        res.end(data)
      })
    }
  })
  .listen(3000, () => {
    console.log('running...');

  })

  /**
   * 1. / index.html
   * 2. 开放 public 目录中的静态资源
   *    当强求 /public/xxx 的时候,读取响应public 目录中的具体资源
   * 3. /post post.html
   * 4. /pinglun
   *  4.1 接收表单提交的数据
   *  4.2 存储表单提交的数据
   *  4.3 让表单重定向到 /
   *      statusCode
   *      setHeader
   */