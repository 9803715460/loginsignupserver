let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let SignupSchema = new Schema({

	Firstname: String,
	Lastname: String,
	UserName: String,
	age: String,
	email: String,
	gender: String,
	password:String
});


module.exports = mongoose.model('User', SignupSchema);