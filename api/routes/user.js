let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt")

const UserController = require('../controllers/user');
const sigincontroller = require('../controllers/login');
const showuserController = require('../controllers/showusers');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);
router.post("/login", sigincontroller.user_login);
router.get("/showusers",checkAuth,showuserController.showusers);

module.exports = router;
