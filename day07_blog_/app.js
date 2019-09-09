const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const session = require('express-session')

const router = require('./router')

const app = express()

const port = 3000;

//* 开放目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//* 配置使用art-template模板引擎
// 第一个参数标识,当渲染以 .html 结尾的文件的时候,使用art-template模板引擎
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'))  // 默认就是 ./views目录
/**
 * ! 1.配置body-parser解析表单POST请求体插件
 * 只要加入这个配置,则在req请求对象上会多出来一个属性 : body
 * 也就是说你就可以直接通过req.body来获取表单POST请求题数据了
 * parse  application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

/**
 * 在 Express 这个框架中,默认不支持Session和Cookie
 * 但是我们可以使用第三方中间件: express-session来解决
 * 1. yarn add express-session
 * 2. 配置(一定要在路由配置之前)
 * 3. 使用
 *  当把这个插件配置好之后,我们就可以通过req.session来访问和设置session成员了
 *  添加 Session 数据: req.session.foo = 'bar'
 *  访问 Session 数据: req.session.foo
 */
app.use(session({
  // 配置加密字符串,它会在原有加密基础之上和这个字符串拼起来,
  // 增加安全性,防止客户端恶意伪造
  secret: 'keyboard cat',  
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session,我都默认给你分配
}))

// 把路由挂载到app中
app.use(router)

// 配置一个处理 404 的中间件
app.use((req,res) => {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use((err,req,res,next)=> {
  res.status(500).json({
    err_code:500,
    message: err.message
  })
})

app.listen(port,()=> {
  console.log(`running at http://localhost:${port}/`);
  
})