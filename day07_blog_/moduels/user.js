const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/test');

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