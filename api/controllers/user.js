let express = require("express");
let User = require("../models/user")
let router = express.Router();
let bcrypt = require("bcrypt")
let Promise= require('bluebird')
const userController = {
	user_signup: (req, res, next) => {

		User.find({ email: req.body.email })
			.exec()
			.then(user => {
				if (user.length >= 1) {
					return res.status(409).json({
						message: "Mail exists"
					});
				}
				else {
					// console.log(req.body);
					// let u = new User(req.body);
					// u.save();
					// return res.status(201).json({
					// 	data: u
					// });
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err) {
							console.log('err', err);
							return res.status(500).json({
								error: err
							});
						}
						else {
							let U = req.body;
							U.password = hash;
							let Usr = new User(U);
							Usr.save();
									res.status(201).json({
										message: "User created"
									});
						}
					});
				}
			});
	}
,
	edit:(req,res)=>{
		Promise.coroutine( function*() {
	
		  let user = yield User.findOne({UserName: req.body.UserName});
		  if(user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						console.log('err', err);
						return res.status(500).json({
							error: err
						});
					}
					else {
						let U = req.body;
						U.password = hash;
					
						User.findOne({ UserName: req.body.UserName }, function (err, Usr){
							
							console.log(Usr)
							console.log(req.body)
							Usr.UserName = req.body.UserName;
							Usr.Firsrname = req.body.Firstame;
							Usr.Lastname = req.body.Lastname;
							Usr.email = req.body.email;
							Usr.password = hash;
							Usr.age = req.body.age;
							Usr.gender = req.body.gender;
							Usr.save();
							return res.status(200).json({
								message: "user edited"
							});
						  });
					}
				});
			}
	
		}).apply(this);
	  }
  
	
};


 







module.exports = userController;