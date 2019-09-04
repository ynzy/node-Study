//! 1.在 Node中,每个模块内部都有一个自己的module对象
// 该module对象中,有一个成员叫: export, 也是一个对象
// 也就是说如果你需要对外导出成员,只需要把导出的成员挂载到module.exports对象成员中

//! 3.我们发现每次导出接口成员的时候都通过 module.exports.xxx = xxx 很不方便
// 所以,Node为了简化操作,专门提供了一个变量: exports = module.exports

// var module = {
//   exports: {
//     foo: 'bar'
//   }
// }

//! 4.也就是说在模块中还有这么一句代码
// var exports = module.exports

//! 5.两者一致,那就说明,我可以使用任意一方导出成员
// console.log(exports === module.exports);

//! 6.当模块需要导出单个成员的时候
// 直接给exports 赋值是不管用的

module.exports.foo = 'bar'
// 谁来require我,谁就得到module.exports
//! 2.默认在代码的最后有一句
// 最后return的是module.exports,不是exports,所以给exports重新赋值不管用
// return module.exports

//! 真正使用的时候
/**
 * 导出多个成员(1): exports.xxx = xxx
 * 导出多个成员(2): module.exports = {
 *                 }
 * 导出单个成员: module.exports = xxxaSWa从GV看 
 */