const express = require("express");
// import middleware from "../middlewares/auth.middleware.js";
const user = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the authentication." });
});

/**
 * @desc Route to register user
 * @route POST api/users
 * @access Private available for Admin
 */

//loclahost:8000/register
http: router.post(
  "/register" /*, middleware.validateRegister*/,
  user.userRegisterUser
);

// /**
//  * @desc Route to log a user
//  * @route POST api/users
//  * @access Private available for Admin
//  */
// router.post("/login" /*, middleware.validateLogin*/, user.userLoginUser);
// router.post("/verifyOtp", user.userVerifyOtp);

// // router.put("/resetSecret/:id", allowIfLoggedin, user.resetSecret);

module.exports = router;
