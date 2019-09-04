const http = require('http');
const fs = require('fs')
let server = http.createServer();

const wwwDir = 'G:/www'

server.on('request', function (req, res) {
  let url = req.url;
  fs.readFile('./template.html', (err, data) => {
    if (err) return res.end('404 Not Found')
    /**
     * 1. 如何得到wwwDir 目录列表中的文件名和目录名
     *    fs.readir
     * 2. 如何将得到的文件名和目录名替换到templa.html中
     *  2.1 在template.html 中需要替换的位置预留一个特殊的标记,(就像以前的模板引擎一样)
     *  2.2 根据files生成需要的Html内容
     *    模板引擎
     * 只要做了这两件事,这个问题就解决了
     */
    fs.readdir(wwwDir, (err, files) => {
      if (err) return res.end('Can not find WWW dir.')
      // console.log(files);
      //* 2.1 生成需要替换的内容
      var content = ''
      files.forEach(item => {
        content += `
        <tr>
          <td data-value="apple/"><a class="icon dir" href="/G:/www/apple/">${item}</a></td>
          <td class="detailsColumn" data-value="0"></td>
          <td class="detailsColumn" data-value="1566564089">2019/8/23 下午8:41:29</td>
        </tr>
        `
      })
      //* 2.3 替换
      data = data.toString();
      // 普通的字符串解析替换,浏览器看到的结果就不一样了
      data = data.replace('^_^', content)
      console.log(data)
      //* 3 发送解析替换过后的响应数据
      res.end(data)
    })


  })
})

server.listen(3000, function () {
  console.log('running...');

})