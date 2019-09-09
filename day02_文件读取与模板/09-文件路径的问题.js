let fs = require('fs')

// ./a.txt 相对于当前文件路径
// ./a.txt 相对于执行node 命令所处的终端路径
// 文件操作路径中,相对路径设计的就是相对于执行 node 命令所处的路径
console.log(`${__dirname}/a.txt`);

fs.readFile(`${__dirname}/a.txt`,'utf8', (err,data) => {
  if(err) throw err
  console.log(data);
})