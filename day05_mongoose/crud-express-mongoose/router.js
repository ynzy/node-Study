/**
 * router.js 路由模块
 * 职责:
 *  处理路由
 *  根据不同的请求方法+ 请求路径设置具体的请求处理函数
 * 模块职责要单一,不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
const express = require('express')
const Student = require('./student')



//! 1.创建一个路由容器
var router = express.Router();

//! 2.把路由挂载到router路由容器中
router.get('/', (req, res) => {
  res.send('index page')
})
// 渲染学生页面
router.get('/students', (req, res) => {
  Student.find().then(data => {
    // console.log(data);
    
    res.render('index.html', {
      fruits: ['苹果', '香蕉', '橘子'],
      students: data
    })
  }, err => res.status(500).send(err))
})
// 渲染添加学生页面
router.get('/students/new', (req, res) => {
  res.render('new.html')
})
/**
 ** 添加学生操作
 * 1. 获取表单数据
 * 2. 处理
 *  将数据保存到db.json文件中用以持久化
 * 3. 发送响应
 */
router.post('/students/new', (req, res) => {
  // console.log(req.body);
  new Student(req.body).save().then(data => {
    // console.log(data);
    res.redirect('/students')
  }, err => res.status(500).send(err))
})

/**
 ** 渲染编辑学生页面
 * 1. 在客户端的列表页中处理链接问题(需要有id参数)
 * 2. 获取要编辑的学生id
 * 3. 渲染编辑页面
 *    根据id把学生信息查出来
 *    使用模板引擎渲染页面
 */
router.get('/students/edit', (req, res) => {

  Student.findByIdAndUpdate(req.query.id).then(student => {
    res.render('edit.html', {
      student
    })
  }, err => res.status(500).send(err))

})

/**
 ** 处理编辑学生操作
 * 1. 获取表单数据  req.body
 * 2. 更新 Student.update()
 * 3. 发送响应
 */
router.post('/students/edit', (req, res) => {
  console.log(req.body.id);
  console.log(req.body);
  
  // let id = req.query.id.replace(/"/g,'')
  Student.findByIdAndUpdate(req.body.id, req.body).then(data => {
    res.redirect('/students')
  }, err => res.status(500).send(err))
})

/**
 ** 删除学生操作
 * 1. 获取要删除的id
 * 2. 根据id执行删除操作
 * 3. 根据操作结果发送响应数据
 */
router.get('/students/delete', (req, res) => {
  // console.log(req.query.id);
  // let id = req.query.id.replace(/"/g,'')
  Student.findByIdAndRemove(req.query.id).then(data=>{
    res.redirect('/students')
  }, err => {
    console.log(err);
    
    res.status(500).send(err)
  })
})
//! 3. 把router导出
module.exports = router


/* module.exports = function(app) {
  app.get('/students', (req, res) => {
    fs.readFile('./db.json','utf8',function (err, data) {
      if(err) return res.status(500).send('Server error')
      let students = JSON.parse(data).students
      res.render('index.html',{
        fruits: ['苹果','香蕉','橘子'],
        students: students
      })
    })
  })

  app.get('/students/new', (req,res) => {

  })

  app.get('/students/new', (req,res) => {

  })

  app.get('/students/new', (req,res) => {

  })
} */
