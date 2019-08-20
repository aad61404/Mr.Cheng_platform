var express = require('express');
const mongoose = require('mongoose');
var app = express();

const db = require('./config/keys').mongoURI;

// 引入 user.js
const users = require('./routes/api/user');

// 為了使用router.post() 使用body-parser
const bodyParser = require('body-parser');
// 解決 postman body底下 x-www-form-urlencoded 問題
app.use(bodyParser.urlencoded({extended: false}))
// 使用 bodyParser json
app.use(bodyParser.json());

mongoose
.connect( db ,{ useNewUrlParser: true })
.then(()=> console.log('MongoDb Connected!'))
.catch(err=> console.log(err))

app.get('/', function (req, res) {
  res.send('http://localhost:5000/api/users/test');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// 使用 user.js
app.use('/api/users', users);
const port = process.env.PORT || 5000;
app.listen(port,()=> {
  console.log(`Example app listening on ${port}!`);
});
