*** login
Post http://localhost:5000/api/users/login
body
key email password
value jason@gmail.com 123456


*** register
x-www-form-urlencoded
Post http://localhost:5000/api/users/register 
body 
key name email password identity
value jason jason@gmail.com 123456 employee

*** current
GET http://localhost:5000/api/users/current
headers 
key Authorization
value Bearer ...

*** 獲取全部
GET http://localhost:5000/api/profiles
headers
key Authorization
value Bearer ...

*** 獲取單個
GET http://localhost:5000/api/profiles/_id
headers
key Authorization
value Bearer ...

*** 修改
Post http://localhost:5000/api/profiles/edit/_id
body
key  type describe income expend cash remark
value 1 2 3 4 5 6

*** 刪除
@DELETE 比較特別 
DELETE http://localhost:5000/api/profiles/delete/_id
headers
key Authorization
value Bearer ...