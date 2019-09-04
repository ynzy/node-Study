// fs 是 file-system 的简写,就是文件系统的意思
// 在node 中如果想要进行文件操作,就必须引入 fs 这个核心模块
// 在fs 这个核心模块中,就提供了所有文件操作相关的API
// 例如: fs.readfile 就是用来读取文件的

//1. 使用require 方法加载fs核心模块
var fs = require('fs')
//2. 读取文件
/**
 * 第一个参数:要读取的文件路径
 * 第二个参数:回调函数
 *    成功: 
 *      data: 数据, error: null
 *    失败:
 *      data: null, error: 错误对象
 */
fs.readFile('./README.md',function(error,data) {
  /**
   * console.log(data);
   * <Buffer 23 20 4e 6f 64 65 2e 6a 73 20 e7 ac ac 31 e5 a4 a9 0d 0a 0d 0a 23 23 20 e4 b8 8a e5 8d 88 e6 80 bb e7 bb 93 0d
0a 0d 0a 2d 20 4e 6f 64 65 2e 6a 73 20 ... >
      文件中存储的其实都是二进制数据 0 1
      这里为什么看到的不是0和1呢?原因是二进制转为16进制了
      但是无论是二进制还是16进制,人类都不认识
      所以我们可以通过toString方法将其转为我们能认识的字符
   */
  // 在这里判断error判断是否有错误
  if(error) {
    console.log(error);
  }else {
    console.log(data.toString());
  }
  
})