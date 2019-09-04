/**
 * find 接收一个方法作为参数, 方法内部返回一个条件
 * find 会遍历所有的元素, 执行你给定的带有条件返回值的函数
 * 符合该条件的元素作为find方法的返回值
 * 如果遍历结束还没有符合该条件的元素,则返回undefined
 */
let users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'},
  {id: 5, name: '张三'}
]


Array.prototype.myFind = function (conditionFn) {
  for(let i=0;i<this.length;i++){
    if(conditionFn(this[i],i)) return this[i]
  }
}
Array.prototype.myFindIndex = function (conditionFn) {
  for(let i=0;i<this.length;i++){
    if(conditionFn(this[i],i)) return i
  }
}
let r = users.myFindIndex((item,index) => {
  return item.id === 1
})
console.log(r);


