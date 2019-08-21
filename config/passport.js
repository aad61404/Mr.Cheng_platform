// 引用 passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
// 與mongoose 結合 引入users
const mongoose = require('mongoose');
const User = mongoose.model('users');
// 引用 keys 
const keys = require('./keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
opts.secretOrKey = keys.secretOrkey;



module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
     console.log(jwt_payload); 
     /* 
     { id: '5d5c206601b76516540f726d',
     name: '翔仁1號',
     iat: 1566365325,
     exp: 1566368925 }
     */
    User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null,user);
            }

            return done(null,false);
        })
        .catch(err => console.log(err));
    }));
}