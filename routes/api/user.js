// login & resiter
const express = require("express");
const router = express.Router();


// 引入 User Schema
const User = require('../../models/User');
// 引入 bcrypt
const bcrypt = require("bcrypt");

// 引入 gravatar
const gravatar = require('gravatar');

// 引入 jsonwebtoken
var jwt = require('jsonwebtoken');

// 引入 keys
const keys = require('../../config/keys');

// 引入passport
const passport = require("passport");

// $route Get api/user/test
// @desc 返回請求的 json 數據
// @access public

// router.get('/test', (req,res)=> {
//     res.json({msg: 'login works'})
// })

// $route Post api/user/register
// @desc 返回請求的 json 數據
// @access public

router.post('/register', (req,res)=> {
    console.log(req.body);
    // res.json(req.body);
    
    // 查詢數據中 是否擁有郵件
    User.findOne({email: req.body.email}).then((user)=> {
        if(user){
            return res.status(400).json('郵箱已被註冊!')
        }else {

            // var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: 'mm'}); 404改成mm 會有頭像
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                identity: req.body.identity,
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
// $route POST api/user/login
// @desc 返回請求 token jwt passport
// @access public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    //查詢數據庫
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json('用戶不存在!');
            }
            // 密碼匹配
            // Load hash from your password DB.
            // bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    // res.json({msg: 'success'})
                    // jwt.sign('規則','加密名字','過期時間','箭頭函數')
                    const rule = {
                        id: user.id ,
                        name: user.name,
                        avatar: user.avatar,
                        identity: user.identity
                    };
                    jwt.sign(rule, keys.secretOrkey, {expiresIn:3600}, (err,token) => {
                        if(err) throw err;
                        res.json({
                            success: true,
                            token: 'Bearer '+ token
                        })
                    })

                }else {
                    return res.status(400).json('密碼錯誤!');
                }
            })
        })
});

// 假設用戶已經拿到token
// $route POST api/user/current
// @desc return current user
// @access private
// router.get('/current', '驗證token', (req,res)=> {
//     res.json({msg: 'success'});
// })

router.get("/current", passport.authenticate("jwt", {session:false}) , (req,res) => {
    // res.json({msg: 'success'});
    // res.json(req.user);  // 返回太多資訊 需要調整 
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })

})
module.exports = router;