const express = require("express");
const middleware = require("../middlewares/authMiddleware.js");
const auth = require("../controllers/api/authControllers.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the authentication." });
});

/**
 * @desc Route to register user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/register", middleware.validateRegister, auth.authRegisterUser);

/**
 * @desc Route to log a user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/login", middleware.validateLogin, auth.authLoginUser);

module.exports = router;

