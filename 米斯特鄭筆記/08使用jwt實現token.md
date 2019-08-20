本章節 你將學到
***輸入 login 密碼成功時 產生 token
npm install jsonwebtoken
https://www.npmjs.com/package/jsonwebtoken

// 引入 jsonwebtoken
var jwt = require('jsonwebtoken');

到 config 資料夾
/config/key.js 新增secretOrkey
module.exports = {
    mongoURI: 'mongodb+srv://test:1234@cluster0-zwwhw.mongodb.net/test?retryWrites=true&w=majority',
    secretOrkey: 'secret'
}

// 引入 keys
const keys = require('../../config/keys');

輸入 login 密碼成功時 產生 token
再將  bcrypt.compare 裡 if(isMatch 條件變更)
 ... 
下面會有範例

變更前
```
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查詢數據庫
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: '用戶不存在!'});
            }
            // 密碼匹配
            // Load hash from your password DB.
            // bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    res.json({msg: 'success'})
                }else {
                    return res.status(400).json({password:'密碼錯誤!'});
                }
            })
        })
});
```

變更後
```
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查詢數據庫
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: '用戶不存在!'});
            }
            // 密碼匹配
            // Load hash from your password DB.
            // bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    // res.json({msg: 'success'})
                    // jwt.sign('規則','加密名字','過期時間','箭頭函數')
                    const rule = {id: user.id , name: user.name};
                    jwt.sign(rule, keys.secretOrkey, {expiresIn:3600}, (err,token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: 'jason'+ token
                        })
                    })

                }else {
                    return res.status(400).json({password:'密碼錯誤!'});
                }
            })
        })
});

```

此時postman 輸入 http://localhost:5000/api/users/login

key 值 email , password
value 值 test@test.com ,  123456

send 送出後返回
{
    "success": true,
    "token": "jasoneyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNWJmZjc3OWI3NzM3MDVkMDkxYzQ5ZCIsIm5hbWUiOiLmiJHkuI3mmK_phK3nv5Tku4EiLCJpYXQiOjE1NjYzMjExMTAsImV4cCI6MTU2NjMyNDcxMH0.FgGxq5BtdqwvLrp9D9CQgEK_Gc9TGbKGh_0sYASv7Vs"
}