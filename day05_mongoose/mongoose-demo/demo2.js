const mongoose = require('mongoose')
// 
const Schema = mongoose.Schema;

//* 1. 链接数据库
mongoose.connect('mongodb://localhost/test');

/**
  ** 2. 设计集合结构(表结构)
  * 字段名称就是表结构中的属性名称
  * 值:
  * 约束的目的是为了保证数据的完整性,不要有脏数据
 */

const userSchema = new Schema({
  username: {
    type: String,
    required: true //* 标识必须
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

/**
 ** 3.将文档结构发布为模型
 * mongoose.model 方法就是用来将一个架构发布为model 
 * 第一个参数: 传入一个大写名词单数字符串用来标识你的数据库名称
 *             mongoose 会自动大写名词的字符串生成 小写复数 的集合名称
 *             例如这里的 User 最终会变为 users 集合名称
 * 第二个参数: 架构Schema
 * 返回值: 模型对象(模型构造函数)
 */
const User = mongoose.model('User', userSchema)

// 4. 当我们有了模型构造函数之后,就可以使用这个构造函数对users集合中的数据为所欲为(增删改查)

//#region 添加数据
// let admin = new User({
//   username: '张三',
//   password: '123456',
//   email: 'admin@admin.com'
// })
// admin.save((err,ret) => {
//   if(err) return console.log('保存失败');
//   console.log('保存成功');
//   console.log(ret);
// })
//#endregion 添加数据

//#region 查询数据
// * 查询所有
/* User.find((err,ret) => {
  if(err) return console.log('查询失败');
  console.log('查询成功');
  console.log(ret);
}) */
// * 按条件查找
/* User.find({
  username: '张三'
},(err,ret) => {
  if(err) return console.log('查询失败');
  console.log('查询成功');
  console.log(ret);
}) */
/* User.findOne({
  username: '张三',
  password: '123456'
},(err,ret) => {
  if(err) return console.log('查询失败');
  console.log('查询成功');
  console.log(ret);
}) */
//#endregion 查询数据

//#region 删除数据
/* User.remove({
  username: '张三'
},(err,ret) => {
  if(err) return console.log('删除失败');
  console.log('删除成功');
  console.log(ret);
}) */
//#endregion 删除数据

//#region 更新数据
/* User.findByIdAndUpdate('5d6f6a88d4d29713880736b4',{
  password: 'zhangyong'
},(err,ret) => {
  if(err) return console.log('更新失败');
  console.log('更新成功');
  console.log(ret);
}) */
//#endregion 更新数据