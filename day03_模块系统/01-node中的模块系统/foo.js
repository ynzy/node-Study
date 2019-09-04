var foo = 'foo';

const add = () => {
  console.log('add');
}

// exports.add = add

// exports 是一个对象
// 可以通过多次为这个对象添加成员实现导出多个内部成员

// exports.foo = foo


// 我希望加载得到直接就是一个: 方法,字符串,数字,数组
// 有时候,对于一个模块,我仅仅就是希望导出一个方法就可以了
// 如果一个模块需要直接导出某个成员而非挂载的方式,
// 必须使用下面这种方式.
module.exports = add;