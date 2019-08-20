本章節你將學到
登入密碼 驗證 
*** bcrypt.compare

// $route POST api/user/login
// @desc 返回請求 token jwt passport
// @access public
使用
https://www.npmjs.com/package/bcrypt

```
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
```

到routes/api/user.js 最底下新增新增 


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