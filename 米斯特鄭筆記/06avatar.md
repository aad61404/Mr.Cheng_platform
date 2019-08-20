本章節你可以學到
** gravatar
npm i gravatar
https://www.npmjs.com/package/gravatar

// 引入 gravatar
到routes/api/user.js 新增 

const gravatar = require('gravatar');
在newUser 新增 avatar 欄位
```
  // 查詢數據中 是否擁有郵件
    User.findOne({email: req.body.email}).then((user)=> {
        if(user){
            return res.status(400).json({email:'郵箱已被註冊!'})
        }else {

            // var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: 'mm'}); 404改成mm 會有頭像
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            // 此時需要加密
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    ....
                    ....

```