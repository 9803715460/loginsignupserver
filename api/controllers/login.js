let express = require("express");
let User = require("../models/user")
let router = express.Router();
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken');

let sigincontroller={
    user_login:(req,res)=>{
    User.findOne({ UserName: req.body.UserName })
   
    .exec()
    .then(user => {
     
      console.log(req.body)
      
      console.log(user.password)
      bcrypt.compare( req.body.password, user.password, (err, result) => {
        console.log(err, result);
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              UserName: user.UserName,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }else{
          res.status(401).json({
            message: "Authii failed"
          });
        }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}}
module.exports=sigincontroller