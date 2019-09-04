const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true })

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    required: true,
    enum: [0, 1],  // 枚举限定
    default: 0
  },
  age: {
    type: Number
  },
  hobbies: {
    type: String,
  }
})

// 直接导出模型构造函数
module.exports = mongoose.model('Student',studentSchema)
