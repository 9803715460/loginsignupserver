let express = require("express");
let bodyParser = require("body-parser");
let cron = require("node-cron");
let fs = require("fs");
let https = require('https');
let mongoose = require("mongoose");
let cors = require("cors");
let userroutes =require("./api/routes/user")
//let loginroutes =require("./api/routes/login")
let router = express.Router();

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
	{ extended: true }
));
app.use('/',userroutes);
require('dotenv').load();
let mongoDB = "mongodb://127.0.0.1:27017/signup";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB Connection Error: '));




module.exports = app;