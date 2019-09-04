// 

/**
 * art-template
 * !在node中使用art-template模板引擎
 *   模板引擎最早就是诞生于服务器领域,后来发展到了前端
 * !art-template 不仅可以在浏览器中使用,也可以在node中使用
 * * 1.安装: 
 *     yarn add art-template
 * * 2.在需要使用的文件模块中加载art-template
 *      只需要使用require方法加载就可以了
 *      参数中的art-template就是你下载的包名字
 * * 3.查文档,使用模板引擎的API
 */

const template = require('art-template')
const fs = require('fs')
// let tpl = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>Document</title>
// </head>
// <body>
// <p>大家好,我叫:{{name}}</p>
// <p>我今年{{age}}岁了</p>
// <p>我来自{{address}}</p>
// <p>我喜欢你: {{each hobbies}}{{$value}}{{/each}}</p>
// </body>
// </html>
// `
//这里不是浏览器
//  template('script 标签 id',{对象})
fs.readFile('./tpl.html', 'utf8', (err, data) => {
  if (err) return

  /**
   * 默认读取到的data是二进制数据
   * 而模板引擎的render方法需要接收的是字符串
   * 所以我们在这里需要把二进制数据转为 字符串 才可以给模板引擎使用
   */
  // 将模板源代码编译成函数并立刻执行
  let ret = template.render(data, {
    name: 'Jack',
    age: 15,
    address: '北京市',
    hobbies: ['吃饭', '睡觉', '打代码'],
    title: '个人信息'
  });
  console.log(ret);
})