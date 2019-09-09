//#region 回调形式
/* function get(url, callback) {
  var oReq = new XMLHttpRequest()
  // 当请求加载成功之后要调用指定的函数
  oReq.onload = function () {
    // 我现在需要得到这里的 oReq.responseText
    callback(oReq.responseText)
  }
  oReq.open("get", url, true)
  oReq.send()
} */

// get('data.json', function (data) {
//   console.log(data)
// })
//#endregion 回调形式

//#region Promise形式
function get(url) {
  return new Promise((resolve, reject) => {
    var oReq = new XMLHttpRequest()
    oReq.onload = function () {
      resolve(oReq.responseText)
    }
    oReq.onerror = function (err) {
      reject(err)
    }
    oReq.open("get", url, true)
    oReq.send()
  })

}


//#endregion Promise形式



