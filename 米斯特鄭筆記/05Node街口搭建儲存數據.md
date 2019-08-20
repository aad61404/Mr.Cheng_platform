本章節 注重 
你可以學到
** router.post() 需要 body-parser
** 把資料儲存到 mongodb 
** 密碼加密 bcrypt
** 送出資料參照 Schema 在最底下

// $route POST api/user/test
// @desc 返回請求的 json 數據
// @access public

需要用到 router.post() 必須安裝 body-parser
npm install body-parser 

在 server.js 新增
```
// 為了使用router.post() 使用body-parser
const bodyParser = require('body-parser');
// 解決 postman body底下 x-www-form-urlencoded 問題
app.use(bodyParser.urlencoded({extended: false}))
// 使用json
app.use(bodyParser.json());

```
在 routes/api/user.js  新增
```
// $route Post api/user/register
// @desc 返回請求的 json 數據
// @access public

router.post('/register', (req,res)=> {
    console.log(req.body);
    // res.json(req.body);
})

```

此時 你在 postman body Key  Vaule輸入 

Key 輸入 email , Value 輸入 test@test.com
Send 送出
http://localhost:5000/api/users/register 
應該看到  { email: 'test@test.com' }


下一步則是 查詢 數據庫中 是否已有相同 email
需要 密碼 加密套件 bcrypt
npm install bcrypt

https://www.npmjs.com/package/bcrypt

在user.js 新增
```
// 引入 User Schema
const User = require('../../models/User');
// 引入 bcrypt
const bcrypt = require("bcrypt");

// ...

router.post('/register', (req,res)=> {
    console.log(req.body);
    // res.json(req.body);
    
    // 查詢數據中 是否擁有郵件
    User.findOne({email: req.body.email}).then((user)=> {
        if(user){
            return res.status(400).json({email:'郵箱已被註冊!'})
        }else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            // 此時需要加密
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    // Store hash in your password DB.
                    if(err) throw err;
                    // 將password 加密
                    newUser.password = hash;

                    newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                });
            });
        }
    })
})

```
此時在 postman
key 輸入 email , name , password 
Value 輸入 test@test.com , 我不是鄭翔仁 , 1234

送出 send 成功會返回
{
    "_id": "5d5bff779b773705d091c49d",
    "name": "我不是鄭翔仁",
    "email": "test@test.com",
    "password": "$2b$10$8UzechPiLcBUA/6JL2wkpebhN1Vj9WuiipTyH6JP1uudmIGERD67u",
    "date": "2019-08-20T14:11:03.781Z",
    "__v": 0
}

上一章節結尾新增Schema
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