const fs = require('fs')

//* 文件操作中的相对路径可以省略 ./
// fs.readFile('data/a.txt','utf8',function (err, data) {
//   if(err) return console.log('读取失败');
//   console.log(data);
// })

/**
 * * 在模块加载中,相对路径中的./不能省略
 * 
 */
// require('./data/foo')()

/**
 * * 在文件操作的相对路径中
 * ./data/a.txt   相对于当前目录
 *  data/a.txt    相对于当前目录
 *  /data/a.txt   绝对路径,当前文件模块所处磁盘根目录
 *  c:/xxx/xxx... 绝对路径
 */

fs.readFile('/data/a.txt',function (err, data) {
  if(err) return console.log(err);
  console.log(data.toString());
})

//* 这里如果省略了也是磁盘根目录
require('/data/foo')()