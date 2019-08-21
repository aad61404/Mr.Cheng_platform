var express = require('express');
const mongoose = require('mongoose');
var app = express();

// db  keys
const db = require('./config/keys').mongoURI;

// 引入 user.js
const users = require('./routes/api/user');

// 引入 passport
const passport = require('passport');

// 為了使用router.post() 使用body-parser
const bodyParser = require('body-parser');
// 解決 postman body底下 x-www-form-urlencoded 問題
app.use(bodyParser.urlencoded({extended: false}))
// 使用 bodyParser json
app.use(bodyParser.json());

//引入 profile
const profiles = require('./routes/api/profiles');

mongoose
.connect( db ,{ useNewUrlParser: true })
.then(()=> console.log('MongoDb Connected!'))
.catch(err=> console.log(err))

//passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

app.get('/', function (req, res) {
  res.send('http://localhost:5000/api/users/test');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// 使用 user.js
app.use('/api/users', users);
app.use('/api/profiles', profiles);
const port = process.env.PORT || 5000;
app.listen(port,()=> {
  console.log(`Example app listening on ${port}!`);
});
