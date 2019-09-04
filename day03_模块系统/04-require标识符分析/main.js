/**
 * 1. 文件模块:
  *  1. 非路径形式的模块标识
  *  2. 路径形式的模块
 * 2. 核心模块
 *    核心模块文件已经编译到二进制文件中了,我们只需要按照名字来加载就可以了
 * 3. 第三方模块
 *    凡是第三方模块都必须通过npm来下载
 *    使用的时候就可以通过require('包名')的方式来进行加载才可以使用
 *    不可能有任何一个第三方包和核心模块名字是一样的
 * 既不是核心模块/也不是路径形式的模块
 *  先找到当前文件所处目录中的node_modules目录
 *  node_module/art-template
 *  node_module/art-template/package.json 文件
 *  node_module/art-template/package.json 中的main属性
 *  main属性中就记录了art-template 的入口模块
 *  然后加载使用这个第三方包
 *  实际上最终加载的还是文件
 * 
 * 如果package.json 文件不存在或者main指定的入口模块也没有
 * 则node会自动找该目录下的index.js
 * 
 * 如果以上所有任何一个条件都不成立,则会进入上一级目录中的node_module目录查找
 * 如果上一级还没有,则继续往上上一级查找
 * ....
 * 如果直到当前磁盘根目录还找不到,最后会报错
 * can not find module xxx
 * 
 */

 /**
  *! 模块查找机制
  * 优先从缓存加载
  * 核心模块
  * 路径形式的文件模块
  * 第三方模块
  */