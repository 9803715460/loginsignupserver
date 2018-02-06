let express = require("express");
let User = require("../models/user")
let router = express.Router();
let bcrypt = require("bcrypt")
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
							console.log(U)
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
};





module.exports = userController;