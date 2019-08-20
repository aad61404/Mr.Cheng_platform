#asd61404@gmail.com 帳號
本章節除了開通 mongodb 還有 把connect key 引到外部

成功連接 nodemon server.js  會得到 MongoDb Connected!

npm install mongoose --save

server.js
加上
```
// 引入
const mongoose = require('mongoose');

// ...

// 使用
mongoose
.connect('mongodb+srv://test:1234@cluster0-zwwhw.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(()=> console.log('MongoDb Connected!'))
.catch(err=> console.log(err))

```
新增資料夾 config -> key.js
```
module.exports = {
    mongoURI: 'mongodb+srv://test:1234@cluster0-zwwhw.mongodb.net/test?retryWrites=true&w=majority'
}
```

使用
mongoose
.connect('mongodb+srv://test:1234@cluster0-zwwhw.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(()=> console.log('MongoDb Connected!'))
.catch(err=> console.log(err))

```
// 提醒 Metrics Collections 資料觀看地方



測試帳號 test 測試密碼 1234

使用5步驟
Connect to Atlas
Follow this checklist to get started.
40%
Build your first cluster

Create your first database user

Whitelist your IP address 
0.0.0.0/0

Load Sample Data (Optional)

Connect to your cluster

mongodb+srv://test:1234@cluster0-zwwhw.mongodb.net/test?retryWrites=true&w=majority