const express = require('express')
//! 0.引包,处理post请求数据
const bodyParser = require('body-parser')
const app = express()

let comments = [{
  name: '张三',
  message: '今天天气不错',
  dateTime: '2018-08-26'
}]

// 开放接口
app.use('/public/', express.static('./public/'))
/**
 * ! 1.配置body-parser
 * 只要加入这个配置,则在req请求对象上会多出来一个属性 : body
 * 也就是说你就可以直接通过req.body来获取表单POST请求题数据了
 * parse  application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//* 配置使用art-template模板引擎
// 第一个参数标识,当渲染以 .art 结尾的文件的时候,使用art-template模板引擎
// express-art-template是专门用来在express中吧art-template整合到express中

app.engine('html', require('express-art-template'))

/**
 * express 为response 相应对象提供了一个方法: render
 * render方法默认是不可以使用,但是如果配置了模板引擎就可以使用了
 * res.render('html模板名', {模板数据})
 * 第一个参数不能写路径,默认会去项目中的views 目录查找该模板文件
 * 也就是说,express有一个约定,开发人员把所有的视图文件都放到views目录中
 */
// 如果想要修改默认的views目录,则可以这样
// app.set('views', 'render函数的默认路径')

app.get('/', (req, res) => {
  res.render('index.html', {
    comments
  })
})
// app.get('/admin',(req,res)=> {
//   res.render('admin/index.html',{
//     title: '管理系统'
//   })
// })

app.get('/post', (req, res) => {
  res.render('post.html')
})

// 当以POST请求 /post的时候,执行指定的处理函数
app.post('/pinglun', (req, res) => {
  // console.log(req.body);
  let comment = req.body
  comment.dateTime = formatDateTime(new Date())
  comments.unshift(comment)
  res.redirect('/')
})

// app.get('/pinglun', (req, res) => {
//   console.log(req.query);
//   let comment = req.query
//   comment.dateTime = formatDateTime(new Date())
//   comments.unshift(comment)
//   res.redirect('/')
// })

app.listen('3000', () => {
  console.log('running');

})


var formatDateTime = function (date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};  