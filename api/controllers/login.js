let express = require("express");
let User = require("../models/user")
let router = express.Router();
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken');
let Promise= require('bluebird')

let sigincontroller={
    user_login:(req,res)=>{
      Promise.coroutine( function*() {
        let user = yield User.findOne({UserName: req.body.UserName});
        console.log(user);
        if(user) {
          if(bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
              UserName: user.UserName
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            });
            res.status(200).json({
              user: user,
              token: token
            });
          } else {
            res.status(401).json({
              message: "username or password is invalid"
            });
          }
        } else {
          res.status(401).json({
            message: "username or password is invalid"
          });
        }
      }).apply(this);
    }
}
module.exports=sigincontroller