/**
 * student.js
 * 数据操作文件模块
 * 职责: 操作文件中的数据,只处理数据,不关心业务
 */
const fs = require('fs')

const dbPath = './db.json'

/**
* 获取所有学生列表
  return []
*/
exports.find = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject('Server error');
      resolve(JSON.parse(data).students)
    })
  })
}

/**
 * 根据id查询学生信息
 * @param {Number}  id  学生id
 * @return {Promise} student   学生信息
 */
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject('Server error');
      let students = JSON.parse(data).students
      let ret = students.find(item => item.id === parseInt(id))
      resolve(ret)
    })
  })
}

/**
* 添加保存学生
  "id":  
  "name": 
  "gender":  
  "age":  
  "hobbies": 
   *  先读取出来,转成对象
   *  然后往对象中push数据
   *  然后把对象转为字符串
   *  然后把字符串再次写入文件
*/
exports.save = (student) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject('Server error');
      let students = JSON.parse(data).students
      //* 处理id唯一不重复
      student.id = students[students.length - 1].id + 1;
      students.push(student)
      let ret = JSON.stringify({ students })
      fs.writeFile(dbPath, ret, (err, data) => {
        if (err) return reject('添加失败');
        resolve('添加成功')
      })
    })
  })
}

/**
* 更新学生
* @param
*/
exports.updateById = (student) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject('Server error');
      let students = JSON.parse(data).students
      // find 接收一个函数作为参数;查找目标元素，找到就返回该元素，找不到返回undefined。
      //! 这里记得id统一转换为Number类型
      student.id = parseInt(student.id)
      let currentStu = students.find((item) => {
        return item.id === student.id
      })
      // 遍历拷贝对象
      for (let key in student) {
        currentStu[key] = student[key]
      }
      let ret = JSON.stringify({ students })
      fs.writeFile(dbPath, ret, (err, data) => {
        if (err) return reject('修改失败');
        resolve('修改成功')
      })
    })
  })
}

/**
* 删除学生
*/

exports.deleteById = (id) => {
  return new Promise((resolve,reject)=> {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) return reject('Server error');
      let students = JSON.parse(data).students
      let deleteId = students.findIndex(item => {
        return item.id === parseInt(id)
      })

      students.splice(deleteId,1)
      let ret = JSON.stringify({ students })
      fs.writeFile(dbPath, ret, (err, data) => {
        if (err) return reject('删除失败');
        resolve('删除成功')
      })
    })
  })
}