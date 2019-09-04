const mongoose = require('mongoose');

//* 连接MongoDB数据库
mongoose.connect('mongodb://localhost/test');

//* 创建一个模型 --- 就是在设计数据库
// MongoDB 是动态的,非常灵活, 只需要在代码中设计数据库就可以了
// mongoose 这个包就可以让你的设计编写过程变得非常的简单
const Cat = mongoose.model('Cat', { name: String });

for (let i = 0; i < 100; i++) {
  // 实例化一个Cat
  const kitty = new Cat({ name: `喵喵${i}` });
  kitty.save().then(() => console.log('创建成功'));
}