本章節你將學到
此時輸入 http://localhost:5000/api/users/test
會得到
{
"msg": "login works"
}

// $route Get api/user/test
// @desc 返回請求的 json 數據
// @access public

server.js
```
// 引入 user.js
const users = require('./routes/api/user');
// 使用
app.use('/api/users',users);
const port = process.env.PORT || 5000;
app.listen(port,()=> {
  console.log(`Example app listening on ${port}!`);
});
```


routes/api/user.js
```
// login & resiter
const express = require("express");
const router = express.Router();

router.get('/test', (req,res)=> {
    res.json({msg: 'login works'})
})

module.exports = router;
```

此時輸入 http://localhost:5000/api/users/test
會得到
{
"msg": "login works"
}

下一章節會用到
在新增資料夾 models-> User.js
創建 Schema
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema);
```