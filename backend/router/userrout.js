const express = require("express");
const user = require("../controller/usercontroller");
const userAuth = require("../middleware/Authuser");
const routers = express.Router();

routers.route("/signup").post(user.signup);
routers.route("/login").post(user.login);
routers.route("/alluser").get(user.getallUser);
routers.route("/deleteuser/:id").delete(user.deleteUser);

module.exports = routers;
