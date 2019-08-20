npm init
npm touch server.js
npm install express
npm install nodemon -g

修改 server.js
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

nodemon server.js