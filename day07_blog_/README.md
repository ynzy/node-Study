# 博客系统

## 1. 目录结构

```
|-- app.js
|-- constrollers
|-- moduels					数据模型
|-- node_modules    第三方包
|-- package.json    包描述文件
|-- yarn.lock       第三方包版本锁定文件
|-- public          公共静态资源
|-- REAMDE.md       项目说明文档
|-- routes          路由
|__ views           存储视图目录
```
## 2. 起步
1. 安装相关依赖

```shell
yarn add express mongoose
```

2. 启动服务,开放公共资源

```js
const express = require('express')
const path = require('path')
const app = express()

const port = 3000;

//* 开放目录资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.get('/',(req,res)=> {
  res.send('hello world')
})

app.listen(port,()=> {
  console.log(`running at localhost:${3000}`);
})
```
## 3. 添加模板引擎art-template
1. 安装依赖包:https://aui.github.io/art-template/zh-cn/
```js
yarn add art-template express-art-template
yarn add yarn add bootstrap@3 jquery
```
2. 配置模板引擎
```js
//* 配置使用art-template模板引擎
// 第一个参数标识,当渲染以 .html 结尾的文件的时候,使用art-template模板引擎
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'))  // 默认就是 ./views目录, 可以不配置
```
3. 渲染html页面
```js
app.get('/',(req,res)=> {
  res.render('index.html',{
    title: '标题'
  })
})
```

4. 使用模板引擎布局layout公共页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>个人博客项目</title>
  <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
  {{block 'head'}}{{ /block}}
</head>

<body>
  {{include './header.html'}}
  <!-- 留个坑 -->
  {{block 'content'}}
  <h1>默认内容</h1>
  {{/block}}
  {{include './footer.html'}} 

  <script src="/node_modules/jquery/dist/jquery.min.js"></script>
  <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  {{block 'script'}}{{ /block}}
</body>
</html>
```

5. 在index页面使用

```js
<!-- 继承layout页面 -->
{{extend './layout.html'}}

{{block 'head'}} 
<style>
body {
  background: rgb(7, 150, 175);
}
</style>
{{/block}}

{{block 'content'}} 
<div>
  <h1>index 填写内容</h1>
</div>
{{/block}}

{{block 'script'}} 
<script>
window.alert('自己的js')
</script>
{{/block}}
```
## 4. 路由设计router

| 路径      | 方法 | get参数 | post参数                | 是否需要权限 | 备注         |
|-----------|------|---------|-------------------------|--------------|------------|
| /         | GET  |         |                         |              | 渲染首页     |
| /register | GET  |         |                         |              | 渲染注册页面 |
| /register | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                         |              | 渲染登录页面 |
| /login    | POST |         | email、password          |              | 处理登录请求 |
| /logout   | GET  |         |                         |              | 处理退出请求 |

```js
// router.js
const express = require('express')
const router = express.Router();

router.get('/',(req,res)=> {
  res.render('index.html',{
    title: '标题'
  })
})

router.get('/login',(req,res)=> {
  res.render('login.html')
})


router.get('/register',(req,res)=> {
  res.render('register.html')
})


router.get('/logout',(req,res)=> {
  res.render('index.html')
})

module.exports = router;
```

```js
// app.js
const router = require('./router')

// 把路由挂载到app中
app.use(router)
```



## 5. body-parser获取表单POST请求体数据

1. 安装依赖包https://github.com/expressjs/body-parser

```js
yarn add body-parser
```

2. 配置body-parser

```js
// app.js
const bodyParser = require('body-parser')
/**
 * ! 1.配置body-parser解析表单POST请求体插件
 * 只要加入这个配置,则在req请求对象上会多出来一个属性 : body
 * 也就是说你就可以直接通过req.body来获取表单POST请求题数据了
 * parse  application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
```

3. 获取注册用户表单post数据

```js
router.post('/register',(req,res)=> {
  console.log(req.body);
})
```

## 6. 数据库操作

链接: http://www.mongoosejs.net/

### 1. 创建数据库模型

```js
// ~moduels/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { //* 邮箱
    type: String,
    required: true
  },
  nickname: { //* 昵称
    type: String,
    required: true
  },
  password: {  //* 密码
    type: String,
    required: true
  },
  created_time: { //* 创建时间
    type: Date,
    /**
     * !注意: 这里不要写 Date.now() 因为会即刻调用
     * 这里直接给了一个方法: Date.now
     * 当你去 new Model 的时候,如果没有传递create_time,
     * 则mongoose就会调用default指定的Date.now方法,使其返回值作为默认值
     */
    default: Date.now
  },
  last_modified_time: {  //* 最后修改时间
    type: Date,
    default: Date.now
  },
  avatar: {  //* 头像
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {  //* 介绍
    type: String,
    default: ''
  },
  gender: {  //* 性别
    type: Number,
    enum: [-1,0,1],
    default: -1
  },
  birthday: {  //* 生日
    type: Date
  },
  status: {
    type: Number,
    /**
     * 0 没有权限限制
     * 1 不可以评论
     * 2 不可以登录
     */
    enum: [1,2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
```

### 2.连接数据库及操作数据库

```js
// ~moduels/user.js
mongoose.connect('mongodb://localhost/test');
```

```js
// ~router.js
const User = require('./moduels/user')

router.post('/register', (req, res) => {
  // console.log(req.body);
  /**
   * 1. 获取表单数据 req.body
   * 2. 操作数据库 
   *    判断该用户是否存在
   *    如果已存在,不允许注册
   *    如果不存在,注册新建用户
   * * 查询邮箱或昵称已存在,有一个存在即查出结果,使用$or
   * 3. 发送响应
   */
  const body = req.body;
  User.findOne({
    $or: [
      { email: body.email },
      { nickname: body.nickname }
    ]
  }).then(user => {
    // 如果邮箱或昵称已存在
    if (user) return res.status(200).json({
      err_code: 1,
      message: `Email or nickname aleady exists`,
    })
    // 否则添加用户
    return new User(body).save()
  }).then(ret => {
    //! express提供了一个响应方法: json
    // 该方法接收一个对象作为参数,他会自动帮你把对象转为字符串再发送给浏览器
    res.status(200).json({
      err_code: 0,
      message: `Ok`
    })
  }, err => {
    return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    })
  })
})
```

> express响应`json`数据:
>
> ```js
> res.json({name:'213'})
> ```

### 3. 使用MD5加密密码

1. 安装依赖包:https://github.com/blueimp/JavaScript-MD5

```js
yarn add blueimp-md5
```

2. 对密码进行双重加密防止破解

```js
// ~user.js
const md5 = require('blueimp-md5')

body.password = md5(md5(body.password))
```

### 4.使用`async/await`优化代码

```js
router.post('/register', async (req, res) => {
  const body = req.body
  try {
    if(await User.findOne({email: body.email})) {
      return res.status(200).json({
        err_code: 1,
        message: `邮箱已存在`
      })
    } 
    if(await User.findOne({nickname: body.nickname})) {
      return res.status(200).json({
        err_code: 1, 
        message: `昵称已存在`
      })
    }
    // 对密码进行md5 重复加密
    body.password = md5(md5(body.password))
    // 创建用户,执行注册
    await new User(body).save()
    res.status(200).json({
      err_code: 0,
      message: `Ok`
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    })
  }
})
```

## 7. 通过session保存登录状态

* 在 Express 这个框架中,默认不支持Session和Cookie

* 但是我们可以使用第三方中间件: express-session来解决

1. 安装依赖

```js
yarn add express-session
```

2. 配置

```js
const session = require('express-session')

app.use(session({
  // 配置加密字符串,它会在原有加密基础之上和这个字符串拼起来,
  // 增加安全性,防止客户端恶意伪造
  secret: 'keyboard cat',  
  resave: false,
  saveUninitialized: true // 无论你是否使用 Session,我都默认给你分配
}))
```

3. 使用
4. 当把这个插件配置好之后,我们就可以通过req.session来访问和设置session成员了

```js
// 添加 Session 数据: 
req.session.foo = 'bar'

// 访问 Session 数据:
req.session.foo
```

> 提示: 默认 Session 数据时内存存储的,服务器一旦重启就会丢失,真正的生产环境会把Session进行持久化存储.

## 8. 用户注册

```js
router.post('/register', async (req, res) => {
  const body = req.body
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: `邮箱已存在`
      })
    }
    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: `昵称已存在`
      })
    }
    // 对密码进行md5 重复加密
    body.password = md5(md5(body.password))
    // 创建用户,执行注册
    let user = await new User(body).save()
    // 注册成功,使用 Session 记录用户的登录状态
    req.session.user = user;

    res.status(200).json({
      err_code: 0,
      message: `Ok`
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    })
  }
})
```

## 9. 用户登录

```js
router.post('/login', async (req, res) => {
  /**
   * 1. 获取表单数据
   * 2. 查询数据库用户密码是否争取
   * 3. 发送响应数据
   */
  // console.log(req.body);
  try {
    let user = await User.findOne({ 
      email: req.body.email, 
      password: md5(md5(req.body.password)) 
    })
    console.log(user);
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: `邮箱或者密码不正确`
      })
    }

    req.session.user = user;
    res.status(200).json({
      err_code: 0,
      message: `success`
    })
  } catch (err) {
    return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    })
  }
})
```

## 10. 用户退出

```js
router.get('/logout', (req, res) => {
  /**
   * 1. 清除登录状态
   * 2. 重定向到登录页
   */
  req.session.user = null;
  res.redirect('/login')
})
```

## 11 配置中间件