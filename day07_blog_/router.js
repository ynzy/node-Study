const express = require('express')
const User = require('./moduels/user')
const md5 = require('blueimp-md5')

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})
// 处理登录请求
router.post('/login', async (req, res,next) => {
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
    /* return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    }) */
    return next(err)
  }

})

router.get('/register', (req, res) => {
  res.render('register.html')
})

// 处理注册请求
router.post('/register', async (req, res,next) => {
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
    /* return res.status(500).json({
      err_code: 500,
      message: `Server Error`
    }) */
    return next(err)
  }
})

router.get('/logout', (req, res) => {
  /**
   * 1. 清除登录状态
   * 2. 重定向到登录页
   */
  req.session.user = null;
  res.redirect('/login')
})

module.exports = router;


//#region Promise

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
/*  const body = req.body;
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
   // 对密码进行md5 重复加密
   body.password = md5(md5(body.password))
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
 }) */
//#endregion Promise




