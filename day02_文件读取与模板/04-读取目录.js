var fs = require('fs');

fs.readdir('G:/www',(err,files) => {
  if(err) return console.log('目录不存在')
  console.log(files);
  
})