let express = require("express");
let user = require("../models/user")
let router = express.Router();

const showuserController ={
    showusers:(req,res)=>{
      user.find({}).exec().then(data =>{
      res.json(data);
      res.end();
    }).catch(err => {
        console.log(err);
    });
    }
}

module.exports = showuserController;